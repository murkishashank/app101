import { convertDateToDbFormat } from "../../utils/InternalDateToDBFormat";
export const getSavePayload = (data) => {
  return data
    .filter((row) => row.editStatus)
    .map((row) => {
      const { editStatus, completedTimeStamp, ...rest } = row;
      return {
        ...rest,
        completedTimeStamp:
          completedTimeStamp === "On progress"
            ? null
            : convertDateToDbFormat(completedTimeStamp),
      };
    });
};
