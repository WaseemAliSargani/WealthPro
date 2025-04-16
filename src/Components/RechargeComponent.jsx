import { useState } from "react";

const RechargeComponent = () => {
  const [rechargeView, setRechargeView] = useState("main");

  const address = {
    "BEP20-USDT": "0x20db7a365bddd2fcd7cc18ff375bf338998df7d6",
    "TRC20-USDT": "TX7jsYkKzq3naWtcBXABpCkGN9vXMXaCkR",
    "TRX": "TPvY6nU1vJjJ2GnAqtMPVGgJbp9QK7K8yb",
    "BNB": "bnb1vktv22drpl32c6w7fj7zlxzjz8lc5se4up8zkn",
    "BEP20-USDC": "0x7cB57B5A97eAbe94205C07890BE4c1aA174C51B2",
  };

  const handleBack = () => {
    setRechargeView("main");
  };

  return (
    <div className="p-4 text-[#efc99d]">
      {rechargeView === "main" ? (
        <>
          <h2 className="text-xl font-bold mb-4">Recharge</h2>
          {Object.keys(address).map((network) => (
            <div
              key={network}
              onClick={() => setRechargeView(network)}
              className="p-3 border-b flex justify-between items-center cursor-pointer"
            >
              <span>{network}</span>
              <span>&gt;</span>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <button onClick={handleBack} className="mr-2 text-xl">&lt;</button>
            <h2 className="text-xl font-bold">{rechargeView}</h2>
          </div>
          <p className="mb-2">Scan me!</p>
          <div className="mb-2">
            {/* Replace with real QR code image if needed */}
            <div className="w-32 h-32 bg-gray-200 mb-2">[QR CODE]</div>
          </div>
          <p className="font-semibold">Recharge Address</p>
          <div className="bg-gray-100 p-2 rounded my-2 text-sm">
            {address[rechargeView]}
          </div>
          <button
            className="text-blue-500 underline text-sm"
            onClick={() => navigator.clipboard.writeText(address[rechargeView])}
          >
            Copy
          </button>
          <div className="text-xs text-gray-600 mt-4 space-y-1">
            <p>1. Copy the address above or scan the QR code and choose the appropriate network.</p>
            <p>2. Do not recharge assets using unsupported networks.</p>
            <p>3. If payment is delayed, refresh or contact support.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default RechargeComponent;
