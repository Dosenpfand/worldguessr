import {Modal} from "react-responsive-modal";
import { useState } from "react";
import { useTranslation } from '@/components/useTranslations'
import sendEvent from "./utils/sendEvent";

export default function SetUsernameModal({ shown, onClose, session, onGuestNameSave, isGuest }) {
    const [username, setUsername] = useState("");
    const { t: text } = useTranslation("common");

    const handleSave = async () => {
        if(window.settingName) return;
        window.settingName = true;

        if (isGuest) {
            // Basic validation for guest username
            if (username.length < 3 || username.length > 20) {
                alert(text("usernameLengthError")); // Assuming you have a translation for this
                window.settingName = false;
                return;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                alert(text("usernameCharError")); // Assuming you have a translation for this
                window.settingName = false;
                return;
            }
            onGuestNameSave(username);
            // No reload needed, home.js will handle state update
            window.settingName = false;
        } else if (session && session.token && session.token.secret) {
            const secret = session.token.secret;
            const response = await fetch(window.cConfig.apiUrl+'/api/setName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, token: secret })
            });

            if (response.ok) {
                sendEvent("sign_up");
                setTimeout(() => {
                    window.location.reload();
                },200);
            } else {
                window.settingName = false;
                try {
                  const data = await response.json();
                  alert(data.message || 'An error occurred');
                } catch (error) {
                  alert('An error occurred');
                }
            }
        } else {
            // Should not happen if logic in home.js is correct
            alert("Error: Session not found for registered user.");
            window.settingName = false;
        }
    };

    return (
        <Modal id="setUsernameModal" styles={{
            modal: {
                zIndex: 100,
                background: '#333', // dark mode: #333
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                fontFamily: "'Arial', sans-serif",
                maxWidth: '500px',
                textAlign: 'center'
            }
        }} open={shown} center onClose={()=>{}}>

            <span style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>{text("welcomeToWorldguessr")}</span>
            <h3 style={{
                marginBottom: '20px',
                fontSize: '18px'
            }}>{text("enterUsername")}</h3>

            <input
                type="text"
                placeholder={text("enterUsernameBox")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    fontSize: '16px',
                    padding: '10px',
                    marginBottom: '20px',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
            />

            <button className="saveUsername" style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: 'blue',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer'
            }} onClick={handleSave}>
                {text("save")}
            </button>

            {/* <button className="saveUsername" style={{
                fontSize: '16px',
                color: 'white',
                background: 'black',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer',
                marginLeft: '10px'
            }} onClick={signOut}>
                {text("logOut")}
            </button> */}
        </Modal>
    )
}
