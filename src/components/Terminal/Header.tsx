import useHeader from "../../stores/header/useHeader";

export default function Header() {


    const { displayHelpContext } = useHeader();

    return (
        <div className="mb-5">
            <p>Welcome to Automission.ai (ATM) CLI v2.0.0</p>
            <p>AI-powered cryptocurrency price movement prediction system.</p>
            {displayHelpContext && (
                <p>Type 'atm help' for commands, 'atm readme' for project info.</p>
            )}
        </div>
    )
}
