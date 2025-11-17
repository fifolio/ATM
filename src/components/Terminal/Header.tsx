import useHeader from "../../stores/header/useHeader";

export default function Header() {


    const { displayHelpContext } = useHeader();

    return (
        <div className="mb-5 border-b-1 pb-2 border-gray-700">
            <p>Welcome to Automission.ai (ATM) CLI v2.2.0</p>
            <p>AI-powered cryptocurrency price movement prediction system.</p>
            {displayHelpContext && (
                <p>Type 'atm help' for commands, 'atm whitepaper' for project info.</p>
            )}
        </div>
    )
}
