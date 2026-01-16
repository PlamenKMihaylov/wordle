type HeaderProps = {
    setShowInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setShowInfoModal }:HeaderProps ) {
    return (
        <>
            <div className="header">
                <div className="header-left">
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }}>bar_chart</i>
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }} onClick={() => setShowInfoModal(true) }>help</i>
                </div>
                <div className="header-center">
                    <h1>Bulgarian Wordle 🇧🇬</h1>
                </div>
                <div className="header-right">
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }}>refresh</i>
                    <i className="material-icons" style={{ fontSize: "46px", margin: "6px" }}>settings</i>
                </div>
            </div>
            <hr></hr>
        </>
        
    )
}