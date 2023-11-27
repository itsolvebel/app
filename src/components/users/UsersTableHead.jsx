export function UsersTableHead() {
    return (
        <thead>
        <tr>
            <th className="whitespace-nowrap border border-l-0 border-r-0 border-[#00000010] pr-8 py-3 text-left align-middle text-xs font-bold text-gray-500 hidden xl:table-cell">
                ID
            </th>
            <th className="whitespace-nowrap border border-l-0 border-r-0 border-[#00000010] py-3 text-left align-middle text-xs font-bold text-gray-500">
                Name
            </th>
            <th className="whitespace-nowrap border border-l-0 border-r-0 border-[#00000010] py-3 text-left align-middle text-xs font-bold text-gray-500">
                Email
            </th>
            <th className="whitespace-nowrap border border-l-0 border-r-0 border-[#00000010] py-3 text-left align-middle text-xs font-bold text-gray-500">
                Roles
            </th>
            <th className="whitespace-nowrap border border-l-0 border-r-0 border-[#00000010] py-3 text-left align-middle text-xs font-bold text-gray-500">
                Categories
            </th>
        </tr>
        </thead>
    );
}