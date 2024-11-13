"use client";
import '../globals.css';
import ClassBar from '../components/Teacher-Side/ClassBar';
import StudentList from '../components/Teacher-Side/StudentList';

export default function TeacherPortal() {

  return (
    <div className="text-2xl text-black font-orienta h-auto bg-[#F8F7F4] px-12 pt-20 pb-12 flex flex-col gap-9">
        <ClassBar />
        <div className="flex">
            <StudentList />
        </div>
    </div>
  );
}