import {useEffect, useState} from "react";
import {UsersTableHead} from "@components/users/UsersTableHead";
import {MultiSelect} from "primereact/multiselect";
import toast, {Toaster} from "react-hot-toast";

export default function UserTable({users, roles, categories,fetchUsers}) {
    const [userMap, setUserMap] = useState({});
    const [hasChanged, setHasChanged] = useState(false);
    const [updatedUsers, setUpdatedUsers] = useState({});
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
        setHasChanged(false)
    };

    const handleRolesChange = (userId, roles) => {

        //When you change a value this triggers, even if you change it back
        //First I did it by comparing the data from the initialUserMap with the current state, but if the user list
        //would grow, then optimization would become a huge problem. So this is the easier way with still the
        //wished functionality.
        setHasChanged(true);

        setUserMap((prevUserMap) => ({
            ...prevUserMap,
            [userId]: {
                ...prevUserMap[userId],
                roles: roles,
            },
        }));
        setUpdatedUsers((prevUserMap) => ({
            ...prevUserMap,
            [userId]: {
                ...prevUserMap[userId],
                roles: roles,
            }
        }));
    };

    const handleCategoryChange = (userId, categories) => {
        //see handleRolesChange for explanation.
        setHasChanged(true);

        setUserMap((prevUserMap) => ({
            ...prevUserMap,
            [userId]: {
                ...prevUserMap[userId],
                categories: categories,
            },
        }));
        setUpdatedUsers((prevUserMap) => ({
            ...prevUserMap,
            [userId]: {
                ...prevUserMap[userId],
                categories: categories,
            }
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
                })
            );

            //Once all requests are made, get the new data to update the dashboard
            fetchUsers();
        } catch (error) {
            console.error("Error while saving changes:", error);
        }
        resetUserMap();
    }

    async function updateUserRoles(id, roles) {
        try {
            await fetch(`http://localhost:3001/api/v1/users/${id}/roles`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(roles),
            });
        } catch (error) {
            console.error(`Error updating roles for user ${id}:`, error);
            throw error;
        }
    }

    async function updateCategories(id, categories) {
        try {
            await fetch(`http://localhost:3001/api/v1/users/${id}/categories`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(categories),
            });
        } catch (error) {
            console.error(`Error updating categories for user ${id}:`, error);
            throw error;
        }
    }


    function handleSaveClick() {
        const toastId = toast.promise(saveChanges(), {
            loading: "Saving users...",
            success: "Successfully saved the users!",
            error: "There was an error while saving the users. Please try again. If this keeps happening, please contact support."
        })
        return false;
    }

    return (
        <div className={"flex h-screen w-full flex-col"}>
            <Toaster/>
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
                        {userMap[user.id]?.roles.includes("Freelancer") ? (
                            <td className={"w-4/12"}>
                                <MultiSelect
                                    value={userMap[user.id].categories || []}
                                    onChange={(e) => handleCategoryChange(user.id, e.value)}
                                    options={categories}
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
                <button onClick={resetUserMap} className=
                    "bg-[#D5726E] text-[#F2F2F2]
       rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out "
                >Reset</button>
                <button onClick={() => hasChanged && handleSaveClick()}
                        className={`text-[#F2F2F2] rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out ${hasChanged ? "bg-[#5A8ED1]" : "bg-gray-600"}`}
                >
                    Save
                </button>
            </div>
        </div>
    );
}
