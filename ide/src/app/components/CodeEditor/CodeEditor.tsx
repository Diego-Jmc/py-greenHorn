"use client"
import { useEffect, useState } from 'react';
import './code-editor.css'
import axios from 'axios';

const CodeEditor = () => {

    const [editorCodeContent, setEditorCodeContent] = useState<string>("");
    const [lineNumberStack, setLineNumberStack] = useState<number[]>([]);
    const [output, setOutput] = useState<string>("")
    const [timeNs, setTimeNs] = useState<string>("")
    const [isOkResponse, setisOkResponse] = useState<boolean>(true)
    const [keywords, setKeywords] = useState<string[]>()


    function countLines(): number {
        return (editorCodeContent.match(/\n/g) || []).length;
    }

    function numberToArray(num: number): number[] {
        const numberArray: number[] = [];

        for (let i = 0; i < num; i++) {
            numberArray.push(i + 2);
        }

        return numberArray;
    }

    function getNumberOfWords(): number {
        return editorCodeContent.split(/\s+/).length - 1
    }

    function getCharCount(): number {
        return editorCodeContent.length
    }

    function handleClearShell() {
        setOutput("")
    }

    // Handle Events
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setEditorCodeContent(event.target.value);
        const lines = countLines();
        setLineNumberStack(numberToArray(lines));
        const splitedText = editorCodeContent.split(/\s+/);
        console.log(splitedText)

    };

    const handleClear = (): void => {
        setEditorCodeContent("")
        setLineNumberStack([])
    }

    const handleRun = (): void => {

        const body = {
            code: editorCodeContent
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/compile`, body)
            .then(res => {

                if (res.status == 200) {
                    setOutput(res.data.output)
                    setTimeNs(res.data.duration_ns)
                    setisOkResponse(res.data.ok)
                }

            }).catch(err => {
                setisOkResponse(false)
            })

    }

    useEffect(() => {
        // retrieve all the keywords from the api 
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/keywords`).then(res => {
            if (res.status == 200) {
                setKeywords(res.data);
            }
        }).catch(err => {
            console.log("Error trying to retreieve the keywords from the api");
        })

    }, [])

    return (

        <div className="home-page-container">


            <div className="ide-container">
                <div className="code-editor-container">


                    <div className="code-editor-options-bar">


                        <div className='code-editor-values'>
                            <p>words: <span className='scalar'>{getNumberOfWords()}</span></p>
                            <p>chars: <span className='scalar'>{getCharCount()}</span></p>
                        </div>




                        <button onClick={handleRun} className="run-btn"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-right-fill top-bar-button-style run-logo" viewBox="0 0 16 16">
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                            Run
                        </button>
                    </div>

                    <div className="code-editor">


                        <div className="number-stack">

                            <div className="stack-code-line-numbers">
                                <p className="line-number" >1</p>

                                {
                                    lineNumberStack.map((e, i) => (
                                        <p className="line-number" key={i}>{e}</p>
                                    ))
                                }

                            </div>

                        </div>

                        <textarea
                            onChange={handleChange} className="code-editor-text-area" spellCheck="false" value={editorCodeContent}></textarea>
                    </div>

                </div>

                <div className="shell-container">

                    <div className="shell-description">
                        <p> Shell</p>
                        <button onClick={handleClearShell} className="clear-btn" >Clear</button>
                    </div>

                    <div className="shell-text-area">
                        <textarea className={isOkResponse ? "" : "fail"} readOnly={true} defaultValue={output}></textarea>

                        <div>
                            <p className="comp-time">ns: {timeNs}</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>


    );
}

export default CodeEditor;
