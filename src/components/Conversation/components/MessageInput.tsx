import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export const MessageInput = ({ onSend }: Props) => {
  const [message, setMessage] = useState("");
  return (
    <form className="d-flex w-100 gap-1">
      <input
        className="w-100 chat-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="send-button"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (!message) return;
          onSend(message);
          setMessage("");
        }}
      >
        <img
          src="https://cdn-icons-png.freepik.com/512/4414/4414831.png"
          alt="Send Icon"
          style={{ height: 20, width: 20 }}
        />
      </button>

      {/* <input
        className="send-button"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (!message) return;
          onSend(message);
          setMessage("");
        }}
        value=""
      /> */}
    </form>
  );
};
