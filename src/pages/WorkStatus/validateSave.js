import { convertDateToDbFormat } from "../../utils/InternalDateToDBFormat";
export const getSavePayload = (data) => {
  return data
    .filter((row) => row.editStatus)
    .map((row) => {
      const { editStatus, taskCompletedDate, ...rest } = row;
      return {
        ...rest,
        taskCompletedDate:
          taskCompletedDate === "On progress"
            ? null
            : convertDateToDbFormat(taskCompletedDate),
      };
    });
};
