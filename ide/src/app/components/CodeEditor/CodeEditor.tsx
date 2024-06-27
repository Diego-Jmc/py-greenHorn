"use client"
import { useState } from 'react';
import './code-editor.css'
import axios from 'axios';
const CodeEditor = () => {

    const [editorCodeContent, setEditorCodeContent] = useState<string>("");
    const [lineNumberStack, setLineNumberStack] = useState<number[]>([]);
    const [output,setOutput] = useState<string>("")
    const [timeNs,setTimeNs] = useState<string>("")
    const [isOkResponse,setisOkResponse] = useState<boolean>(true)


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


    // Handle Events
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setEditorCodeContent(event.target.value);
        const lines = countLines()
        setLineNumberStack(numberToArray(lines))
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

    return (

        <div className="home-page-container">


            <div className="ide-container">
                <div className="code-editor-container">

                    <div className="code-editor-options-bar">

                        <button className="less-size code-editor-option clear-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-dash-lg top-bar-button-style" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                            </svg>
                        </button>


                        <button className="more-size code-editor-option clear-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-plus-lg top-bar-button-style" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg>
                        </button>


                        <button className="clear-btn">Test code</button>
                        <button onClick={handleClear} className="clear-btn">Clear</button>


                        <button onClick={handleRun} className="run-btn"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-caret-right-fill top-bar-button-style" viewBox="0 0 16 16">
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
                        <button className="clear-btn" >Clear</button>
                    </div>

                    <div className="shell-text-area">
                    <textarea className={isOkResponse? "" : "fail"} readOnly={true} defaultValue={output}></textarea>

                        <div>
                            <p className="comp-time">{timeNs}</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>


    );
}

export default CodeEditor;
