import { useDeleteCustomFilter } from "@api-lib/graphql";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ToastMessage } from "../Toastify/Toastify";
import { Input } from "@shadcn/input";
import { Button } from "@shadcn/button";

function SmartFolderDelete({ closeModal, item }) {
  const [disabled, setDisabled] = useState(true);
  const queryClient = useQueryClient();

  const smartFolderMutation = useDeleteCustomFilter({
    onSuccess: () => {
      queryClient.invalidateQueries(["custom_filter_list"]);
      ToastMessage("success", "Folder Deleted.");
    },
    onError: () => {
      ToastMessage("error", "Folder Not Deleted.");
    },
  });

  const checkName = (e) => {
    if (e.target.value === item.name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleDelete = () => {
    smartFolderMutation.mutate(+item.id);
    closeModal();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">Confirm Deletion</h2>
      <p className="text-sm">
        Are you sure to delete &quot;<b>{item.name}</b>&ldquo;
      </p>

      <Input
        className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 mt-9"
        id="name"
        type="text"
        onChange={checkName}
        placeholder={`Please type "${item.name}" to confirm`}
      />
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className={`whitespace-nowrap ${
            disabled ? "bg-red-200" : "bg-[#f00d00]"
          }  text-white font-medium py-3 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Yes, Delete {item.name}
        </Button>
        <Button
          type="button"
          onClick={closeModal}
          className="whitespace-nowrap text-[#1f93ff] hover:text-[#1f93ff] bg-transparent font-medium py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          No, Keep {item.name}
        </Button>
      </div>
    </div>
  );
}

export default SmartFolderDelete;
