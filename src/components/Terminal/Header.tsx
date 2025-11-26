import useHeader from "../../stores/header/useHeader";

export default function Header() {


    const { displayHelpContext } = useHeader();

    return (
        <div className="mb-5 border-b-1 pb-2 border-gray-700">
            <p>Welcome to Automission.ai (ATM) CLI v{import.meta.env.VITE_VERSION_FULL}</p>
            <p>AI-powered cryptocurrency price movement prediction system.</p>
            {displayHelpContext && (
                <p>Type <span className="text-green-400">atm help</span> for commands, <span className="text-green-400">atm whitepaper</span> for project info.</p>
            )}
        </div>
    )
}
