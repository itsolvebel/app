import { useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import toast from "react-hot-toast";
import { UsersTableHead } from "./UsersTableHead";
import { User, UserRole } from "@/typings/user";
import { Category } from "@/typings/category";
import { fetcher } from "@/lib/fetcher";

type Props = {
  users: User[]
  roles: UserRole[]
  fetchUsers: () => void
}

type UserMap = {
  [key: string]: User
}

export default function UserTable({ users, roles, fetchUsers }: Props) {
  const [userMap, setUserMap] = useState<UserMap>({});
  const [hasChanged, setHasChanged] = useState(false);
  const [updatedUsers, setUpdatedUsers] = useState<UserMap>({});
  useEffect(() => {
    const initialUserMap = users.reduce((map, user) => {
      return { ...map, [user.id]: user };
    }, {});
    setUserMap(initialUserMap);
  }, [users]);

  //This is the same method, I tried to do it in a better way with useRef but this caused the initial state to be empty
  //Maybe implement a cleaner way in the future. For now this works.
  const resetUserMap = () => {
    const initialUserMap = users.reduce((map, user) => {
      return { ...map, [user.id]: user };
    }, {});
    setUserMap(initialUserMap);
    setUpdatedUsers({});
    setHasChanged(false);
  };

  const handleRolesChange = (userId: string, roles: UserRole[]) => {

    //When you change a value this triggers, even if you change it back
    //First I did it by comparing the data from the initialUserMap with the current state, but if the user list
    //would grow, then optimization would become a huge problem. So this is the easier way with still the
    //wished functionality.
    setHasChanged(true);

    setUserMap((prevUserMap: UserMap) => ({
      ...prevUserMap,
      [userId]: {
        ...prevUserMap[userId],
        roles: roles,
      },
    }));
    setUpdatedUsers((prevUserMap: UserMap) => ({
      ...prevUserMap,
      [userId]: {
        ...prevUserMap[userId],
        roles: roles,
      },
    }));
  };

  const handleCategoryChange = (userId: string, categories: Category[]) => {
    //see handleRolesChange for explanation.
    setHasChanged(true);

    setUserMap((prevUserMap: UserMap) => ({
      ...prevUserMap,
      [userId]: {
        ...prevUserMap[userId],
        categories: categories,
      },
    }));
    setUpdatedUsers((prevUserMap: UserMap) => ({
      ...prevUserMap,
      [userId]: {
        ...prevUserMap[userId],
        categories: categories,
      },
    }));
  };

  async function saveChanges() {
    if (Object.keys(updatedUsers).length === 0) return;

    try {
      //Do all requests at once so that its faster.
      await Promise.all(
        Object.keys(updatedUsers).map(async (userId) => {
          const user = updatedUsers[userId];
          if (user.roles) {
            await updateUserRoles(userId, user.roles);
          }
          if (user.categories) {
            await updateCategories(userId, user.categories);
          }
        }),
      );

      //Once all requests are made, get the new data to update the (dashboard)
      fetchUsers();
    } catch (error) {
      console.error("Error while saving changes:", error);
      throw new Error("Error while saving changes");
    }
    resetUserMap();
  }

  async function updateUserRoles(id: string, roles: UserRole[]) {
    try {
      await fetcher.put(`/users/${id}/roles`, roles);
    } catch (error) {
      console.error(`Error updating roles for user ${id}:`, error);
      throw error;
    }
  }

  async function updateCategories(id: string, categories: Category[]) {
    try {
      await fetcher.put(`/users/${id}/categories`, categories);
    } catch (error) {
      console.error(`Error updating categories for user ${id}:`, error);
      throw error;
    }
  }


  function handleSaveClick() {
    const toastId = toast.promise(saveChanges(), {
      loading: "Saving users...",
      success: "Successfully saved the users!",
      error: "There was an error while saving the users. Please try again. If this keeps happening, please contact support.",
    });
    return false;
  }

  return (
    <div className={"flex h-screen w-full flex-col"}>
      <div className="flex justify-between px-8 py-4">
        <div>
          <h1 className="text-xl font-bold">Users</h1>
          <span className="text-gray-500">Manage the user roles or the categories of the employees.</span>
        </div>
      </div>
      <table className="border-colla pse w-full items-center bg-transparent ">
        <UsersTableHead />
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className={"w-1/12 pr-8 lg:pr-0 hidden xl:table-cell"}>{user.id}</td>
            <td className={"w-1/12 pr-8"}>{`${user.first_name} ${user.last_name}`}</td>
            <td className={"w-2/12 pr-8"}>{user.email}</td>
            <td className={"w-4/12"}>
              <MultiSelect
                value={userMap[user.id]?.roles || []}
                onChange={(e) => handleRolesChange(user.id, e.value)}
                options={roles}
                display="chip"
                placeholder="Select Roles"
                maxSelectedLabels={4}
                className="md:w-20rem w-full border-2 border-gray-200"
              />
            </td>
            {userMap[user.id]?.roles.includes(UserRole.Freelancer) ? (
              <td className={"w-4/12"}>
                <MultiSelect
                  value={userMap[user.id].categories || []}
                  onChange={(e) => handleCategoryChange(user.id, e.value)}
                  options={Object.values(Category)}
                  display="chip"
                  placeholder="Select Categories"
                  maxSelectedLabels={4}
                  className="md:w-20rem w-full border-2 border-gray-200"
                  filter
                />
              </td>
            ) : (
              <td className={"rounded-lg bg-gray-200"}></td>
            )}
          </tr>
        ))}
        </tbody>
      </table>
      <div className={"flex grow-0 justify-center gap-4 mt-auto pb-5"}>
        <button onClick={resetUserMap}
                className="bg-[#D5726E] text-[#F2F2F2] rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out">
          Reset
        </button>
        <button onClick={() => hasChanged && handleSaveClick()}
                className={`text-[#F2F2F2] rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out ${hasChanged ? "bg-[#5A8ED1]" : "bg-gray-600"}`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
