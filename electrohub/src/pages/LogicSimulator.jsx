import Header from "./Header";

function LogicSimulator() {
  return (
    <div className="min-h-screen bg-[#0b132b] text-white font-sans">
      <Header />
      <h2 className="text-white mb-6 text-2xl font-semibold pt-24 pl-11">
        CIRCUITCORE | Logic Simulator
      </h2>

      <div className="bg-slate-900/80 backdrop-blur-lg border border-white/15 rounded-3xl p-10 w-[550px] text-center text-white mx-auto my-16 shadow-2xl">
        <img src="/images/chipIcon.png" alt="Chip" className="w-72 h-72 mx-auto mb-5 rounded-2xl" />

        <h1 className="text-2xl mb-2">Virtual Electronics Workspace</h1>
        <p className="text-slate-400 text-sm mb-6">
          A high fidelity simulation environment powered by Tinkercad.
        </p>

        <button
          onClick={() => window.open("https://www.tinkercad.com/circuits", "_blank")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-xl font-semibold w-full"
        >
          Launch Tinkercad Simulator
        </button>

        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <div className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex-1 text-center">
            <a href="https://www.tinkercad.com/things/4S1NR5dGjWC-blank-breadboard" target="_blank" rel="noreferrer">
              <img src="/images/blank breadboard.png" alt="Breadboard" className="w-24 h-24 object-contain mx-auto mb-2" />
            </a>
            <h5 className="mb-1">Blank Breadboard</h5>
            <p className="text-xs text-slate-300">Empty workspace with Breadboard</p>
          </div>

          <div className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex-1 text-center">
            <a href="https://www.tinkercad.com/things/b7XweYmmLnC-basic-logic-gates" target="_blank" rel="noreferrer">
              <img src="/images/ICs.png" alt="Logic Gates" className="w-24 h-24 object-contain mx-auto mb-2" />
            </a>
            <h5 className="mb-1">Basic Gates Setup</h5>
            <p className="text-xs text-slate-300">pre-loaded with common logic ICs</p>
          </div>

          <div className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex-1 text-center">
            <a href="https://www.tinkercad.com/circuits" target="_blank" rel="noreferrer">
              <img src="/images/Microcontroller Ready.png" alt="Microcontroller Ready" className="w-24 h-24 object-contain mx-auto mb-2" />
            </a>
            <h5 className="mb-1">Microcontroller Ready</h5>
            <p className="text-xs text-slate-300">Arduino Uno linked and wired</p>
          </div>
        </div>
      </div>

      <p className="text-center text-slate-500 text-xs mt-5 pb-10">
        Simulation Engine: Launchpad Link v2.5
      </p>
    </div>
  );
}

export default LogicSimulator;