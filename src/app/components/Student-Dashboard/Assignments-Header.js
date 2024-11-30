export default function AssignmentsHeader() {
    return(
        <div className="flex w-[50%] h-auto text-[#80817B] justify-between items-center">
                <div className="text-2xl">
                    MY ASSIGNMENTS:
                </div>
                <select className="text-2xl border rounded-[6px] border-[#B8B7AF] text-center px-0 py-2" defaultValue="1">
                    <option value="">Select Unit</option>
                    <option value="1">Unit 1</option>
                    <option value="2">Unit 2</option>
                    <option value="3">Unit 3</option>
                    <option value="4">Unit 4</option>
                    <option value="5">Unit 5</option>
                </select>
        </div>
    ); 
}