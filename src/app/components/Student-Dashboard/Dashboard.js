import Greeting from './Greeting';
import AssignmentsHeader from './Assignments-Header';
import Assignments from './Assignments';

export default function Dashboard({userName}) {
    return(
        <div className="w-full flex flex-col justify-center items-center gap-5 min-h-screen overflow-hidden p-4">
            <Greeting userName={userName}/>
            <AssignmentsHeader />
            <Assignments />
        </div>
    );
}