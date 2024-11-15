import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SimulatorView from './SimulatorView';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const DEFAULT_CODE = `// Welcome to the Robotics Sandbox!
// Here's a simple example to get started:

basic.forever(function() {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.clearScreen()
    basic.pause(500)
})`;

export default function SandboxEditor() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');

  const handleRun = () => {
    try {
      setError('');
      setIsRunning(true);
      // The simulator component will handle the code execution
    } catch (err) {
      setError('Failed to run the code. Please check for errors.');
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Code Editor</h2>
            <div className="space-x-2">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                Run
              </button>
              <button
                onClick={handleStop}
                disabled={!isRunning}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Stop
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="h-[600px] border rounded-md overflow-hidden">
            <MonacoEditor
              language="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Simulator</h2>
          <SimulatorView code={code} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}