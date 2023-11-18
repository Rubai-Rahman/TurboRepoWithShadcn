import { useTranslation } from "next-i18next";
import React, { useState } from "react";

const DeleteModal = ({
  closeModal,
  name,
  message,
  handleDelete,
}: {
  closeModal: () => void;
  name: string;
  message?: string;
  handleDelete: () => void;
}) => {
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation("agentMgmt");
  const checkName = (e) => {
    if (e.target.value === name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="w-full overflow-hidden space-y-3">
      <h2 className="text-2xl font-semibold">
        {t("AGENT_MGMT.DELETE.CONFIRM.TITLE")}
      </h2>
      <p className="text-normal">
        {message ? (
          message
        ) : (
          <>
            Please type &quot;<b>{name}</b>&ldquo; to delete.
          </>
        )}
      </p>

      <input
        className={`appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tigh focus:shadow-outline ${
          disabled ? "focus:outline-redCustom" : "focus:outline-green-500"
        }`}
        autoFocus
        id="name"
        type="text"
        onChange={checkName}
      />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className={`w-1/4 whitespace-nowrap ${
            disabled ? "bg-red-200 cursor-not-allowed" : "bg-[#f00d00]"
          } text-white font-medium py-2 px-6 rounded focus:outline-none focus:shadow-outline`}
        >
          {t("AGENT_MGMT.DELETE.BUTTON_TEXT")}
        </button>

        <button
          type="button"
          onClick={closeModal}
          className="w-1/4 rounded py-2 bg-lineBlueCustom text-grayCustom font-medium text-normal leading-6 hover:text-blueCustom"
        >
          {t("AGENT_MGMT.DELETE.CANCEL")}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
