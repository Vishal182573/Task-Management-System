// "use server";
// import { redirect } from "next/navigation";
import { LoginData, Officer, Task, TaskStatus } from "@/global/types";
import { BASE_URL } from "./config";

export const register = async () => {};

export const login = async (loginData: LoginData) => {
  try {
    const user = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!user) throw new Error("Error in Login");

    return user;
  } catch (error: any) {
    console.error("Error in Login:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const logout = async () => {
  localStorage.removeItem("user");
  // redirect("/login");
  return true;
};

// TODO: modify it for cookie authentication
export const getCurrentUser = async (email: string) => {
  try {
    const user = await fetch("http://localhost:3001/api/user/getCurrentUser", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!user) throw new Error("Error creating Institute");

    return user;
  } catch (error: any) {
    console.error("Error creating officer:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getUser = async (officerId: string) => {
  try {
    const res = await fetch(
      "http://localhost:3001/api/user/getUserById?userId=" + officerId
    );

    if (!res.ok) {
      const message = await res.json();
      console.log(message);
      return message;
    }

    const officer = await res.json();
    return officer;
  } catch (error: any) {
    console.error("Error getting officer:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getOfficerInfoByInstituteNameAndRole = async (instituteName: string, role?: string) => {
  if (!instituteName) {
    console.error('Institute name is required');
    return;
  }

  // Constructing the URL with optional role parameter
  let url = `${BASE_URL}/api/user/getOfficerByInstituteNameAndRole?instituteName=${encodeURIComponent(instituteName)}`;
  if (role) {
    url += `&role=${encodeURIComponent(role)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching officer by institute name and role:', error);
  }
};


export const createUser = async (officerData: Officer) => {
  try {
    const res = await fetch(BASE_URL + "/api/user", {
      method: "POST",
      body: JSON.stringify({
        ...officerData,
        role: "OFFICER",
        photograph: "",
        workingAddress: "",
        password: "sexyboy",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      console.log(message);
    }

    const newOfficerId = await res.json();

    return newOfficerId;
  } catch (error: any) {
    console.error("Error creating officer:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const updateUser = async (officerData: Officer) => {
  try {
    const res = await fetch(BASE_URL + "/api/user", {
      method: "PUT",
      body: JSON.stringify({
        ...officerData,
        photograph: "",
        workingAddress: "",
        password: "sexyboy",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      console.log(message);
    }

    const newOfficerId = await res.json();

    return newOfficerId;
  } catch (error: any) {
    console.error("Error creating officer:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getAllInstitutes = async () => {
  try {
    const res = await fetch(BASE_URL + "/api/institute");
    const institutes = await res.json();
    return institutes;
  } catch (error: any) {
    console.error("Error deleting institute:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getInstitute = async (instituteName: string) => {
  try {
    const res = await fetch(
      BASE_URL + "/api/institute/getInstituteById?name=" + instituteName
    );
    const institute = await res.json();
    return institute;
  } catch (error: any) {
    console.error("Error deleting institute:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const createInstitute = async (
  name: string,
  logo: File,
  nodalOfficerData: Officer,
  reportingOfficerData: Officer
): Promise<any> => {
  try {
    console.log(nodalOfficerData, reportingOfficerData);
    const nodalOfficerId = await createUser(nodalOfficerData);
    const reportingOfficerId = await createUser(reportingOfficerData);

    const res = await fetch(BASE_URL + "/api/institute", {
      method: "POST",
      body: JSON.stringify({
        name,
        nodalOfficerId,
        logo,
        reportingOfficerId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      console.log(message);
    }

    // Generate avatar URL (replace with your implementation)
    // const avatarUrl = avatars.getInitials(nodalOfficerData.username);
    const newInstitute = res.json();

    return newInstitute;
  } catch (error: any) {
    console.error("Error creating institute:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const updateInstitute = async (
  name: string,
  logo: File,
  instituteId: string,
  nodalOfficerData: Officer,
  reportingOfficerData: Officer
): Promise<any> => {
  try {
    console.log(nodalOfficerData, reportingOfficerData);
    const nodalOfficerId = await updateUser(nodalOfficerData);
    const reportingOfficerId = await updateUser(reportingOfficerData);

    const res = await fetch(BASE_URL + "/api/institute", {
      method: "PUT",
      body: JSON.stringify({
        name,
        logo,
        instituteId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      console.log(message);
      return message;
    }

    const updatedInstitute = res.json();

    return updatedInstitute;
  } catch (error: any) {
    console.error("Error creating institute:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const deleteInstitute = async (
  institute: string | null
): Promise<any> => {
  try {
    await fetch(BASE_URL + "/api/institute", {
      method: "DELETE",
      body: JSON.stringify({
        name: institute,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return institute;
  } catch (error: any) {
    console.error("Error deleting institute:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getAllTasks = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/task");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTasksByInstitute = async (instituteId: string) => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/task?institute=" + instituteId
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createNewTask = async (task: Task) => {
  try {
    const res = await fetch(BASE_URL + "/api/task", {
      method: "POST",
      body: JSON.stringify({ ...task }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      console.log(data);
      throw new Error(data.message);
    }

    return data; // newTask
  } catch (error: any) {
    console.error("Error creating Task:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const res = await fetch(BASE_URL + "/api/task/getTaskById?id=" + taskId);
    const task = await res.json();
    return task;
  } catch (error: any) {
    console.error("Error creating Task:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const updateTask = async (taskData: Task) => {
  try {
    const res = await fetch(BASE_URL + "/api/task", {
      method: "PATCH",
      body: JSON.stringify({
        title: taskData.title,
        taskId: taskData.taskId,
        description: taskData.description,
        startingDate: taskData.startingDate,
        endingDate: taskData.endingDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      return { message };
    }

    const updatedTask = res.json();

    return { updatedTask };
  } catch (error: any) {
    console.error("Error updating Task:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
  try {
    const res = await fetch(BASE_URL + "/api/task/updateStatus", {
      method: "PATCH",
      body: JSON.stringify({
        taskId,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      return { message };
    }

    return { updated: true };
  } catch (error: any) {
    console.error("Error updating Task Status:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const deleteTask = async (taskId: string | null) => {
  try {
    const res = await fetch(BASE_URL + "/api/task", {
      method: "DELETE",
      body: JSON.stringify({
        taskId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error: any) {
    console.error("Error deleting task:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/notification");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getNotificationsByInstitute = async (instituteName: string) => {
  try {
    const res = await fetch(
      BASE_URL + "/api/notifications/?id=" + instituteName
    );
    const notifications = await res.json();
    return notifications;
  } catch (error: any) {
    console.error("Error Fetching Notifcations for :" + instituteName, error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

export const updateNotificationReadStatus = async (notificationId: string) => {
  console.log(notificationId);
  try {
    const res = await fetch(
      BASE_URL +
        "/api/notification/updateNotificationReadStatus?notificationId=" +
        notificationId,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error: any) {
    console.error("Error Fetching Notifcations for :", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};

// --- not working ---
export const requestDeadlineExtension = async (): Promise<any> => {
  try {
    const res = await fetch(BASE_URL + "/api/institute", {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const message = await res.json();
      console.log(message);
      return message;
    }

    const newInstitute = res.json();

    return newInstitute;
  } catch (error: any) {
    console.error("Error creating institute:", error);
    throw new Error(error); // Rethrow the error for handling in the calling code
  }
};
// export const addComment = async (
//   name: string,
//   logo: File,
//   instituteId: string,
//   nodalOfficerData: Officer,
//   reportingOfficerData: Officer
// ): Promise<any> => {
//   try {
//     const res = await fetch(BASE_URL + "/api/institute", {
//       method: "PUT",
//       body: JSON.stringify({
//         name,
//         logo,
//         instituteId,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       const message = await res.json();
//       console.log(message);
//       return message;
//     }

//     const newInstitute = res.json();

//     return newInstitute;
//   } catch (error: any) {
//     console.error("Error creating institute:", error);
//     throw new Error(error); // Rethrow the error for handling in the calling code
//   }
// };