
import './documentation.css'
import gh from '../../assets/GreenHorn.png'

export default function Documentation() {
  return (
    <div>
      <div className="information-component-container code-editor-information">


        <div className="code-editor-info">
          <h2 className="information-tittle">
            GreenHorn
          </h2>
          <p className="information-description">

            The system consists of two distinct projects: the Code Editor and the Compiler. The Code Editor, which you are currently using,
            includes comprehensive documentation and personal user information, providing a user-friendly interface for code editing and management.
            The Compiler, written in Python using the PLY library, and the API, developed with Flask, handle the execution and processing of the code,
            ensuring seamless integration and efficient performance across the entire development environment.
          </p>


        </div>

      </div>

      <div className="info-container">
        <div className="variable-section">
          <h2>Define Variables</h2>
          <ul>
            <li><code>def variable -&gt; value</code></li>
          </ul>
        </div>
        <div className="generator-section">
          <h2>Define Generators</h2>
          <ul>
            <li><code>def evens -&gt; gen(1,100,2*n+1) for n</code></li>
          </ul>
        </div>
        <div className="print-section">
          <h2>Print Expressions</h2>
          <ul>
            <li><code>print(2+1)</code></li>
            <li><code>print(2+variable)</code></li>
          </ul>
        </div>
      </div>





    </div>
  );
}
