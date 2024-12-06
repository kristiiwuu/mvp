"use client";
import '../globals.css';
import ClassBar from '../components/Teacher-Side/ClassBar';
import StudentList from '../components/Teacher-Side/StudentList';
import ProblemSpace from '../components/Teacher-Side/ProblemSpace';

export default function TeacherPortal() {

  return (
    <div className="text-2xl text-black font-orienta h-max-screen bg-[#F8F7F4] px-6 py-4 flex flex-col gap-3">
        <ClassBar />
        <div className="flex gap-4">
            <StudentList />
            <ProblemSpace />
        </div>
    </div>
  );
}