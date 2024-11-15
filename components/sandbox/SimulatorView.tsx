import { useEffect, useRef } from 'react';

interface SimulatorViewProps {
  code: string;
  isRunning: boolean;
}

export default function SimulatorView({ code, isRunning }: SimulatorViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isRunning && iframeRef.current) {
      // Load the MakeCode simulator with the current code
      const encodedCode = encodeURIComponent(code);
      iframeRef.current.src = `https://makecode.microbit.org/--docs?code=${encodedCode}`;
    }
  }, [code, isRunning]);

  if (!isRunning) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-gray-500">Click &quot;Run&quot; to start the simulator</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        title="MakeCode Simulator"
        allowFullScreen={true}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}