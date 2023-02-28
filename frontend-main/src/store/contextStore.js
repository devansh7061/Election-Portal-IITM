import create from "zustand";
import {devtools, persist} from 'zustand/middleware'

const contextStore = (set) => ({
  token: "",
  hostel: "",
  department: "",
  course: "",
  studentId: "",
  hasVoted: "",
  rollNo: "",
  isLoggedIn: "false",
  deviceLoggedIn: "false",
  deviceUsername: "",
  deviceToken: "",
  residencyType: "",
  setDeviceToken: (DeviceToken) => {
    set (() => ({deviceToken: DeviceToken}))
  },
  setDeviceUsername: (DeviceUsername) => {
    set (() => ({deviceUsername: DeviceUsername}))
  },
  setDeviceLoggedIn: (DeviceLoggedIn) => {
    set (() => ({deviceLoggedIn: DeviceLoggedIn}))
  },
  setResidencyType: (ResidencyType) => {
    set(() => ({residencyType: ResidencyType}))
  },
  setLoggedIn: (LoggedInStatus) => {
    set(() => ({ isLoggedIn: LoggedInStatus }));
  },
  setRollNo: (studentRollNo) => {
    set(() => ({ rollNo: studentRollNo }));
  },
  setToken: (studentToken) => {
    set(() => ({ token: studentToken }));
  },
  setHostel: (studentHostel) => {
    set(() => ({ hostel: studentHostel }));
  },
  setDepartment: (studentDepartment) => {
    set(() => ({ department: studentDepartment }));
  },
  setCourse: (studentCourse) => {
    set(() => ({ course: studentCourse }));
  },
  setHasVoted: (studentHasVoted) => {
    set(() => ({ hasVoted: studentHasVoted }));
  },
});

const useContextStore = create(
    devtools(
        persist(contextStore, {
            name: "context"
        })
    )
)
export default useContextStore;