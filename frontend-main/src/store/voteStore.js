import create from "zustand";

const voteStore = (set) => ({
  instiAAS: "",
  instiCOCAS: "",
  instiCULSECA: "",
  instiCULSECL: "",
  instiHAS: "",
  instiIAR: "",
  instiSS: "",
  instiSGS: "",
  hostelSGS: "",
  hostelSGSP1: "",
  hostelSGSP2: "",
  hostelSGSP3: "",
  setHostelSGSP3: (HostelSGSP3) => {
    set(() => ({ hostelSGSP3: HostelSGSP3 }));
  },
  setHostelSGSP2: (HostelSGSP2) => {
    set(() => ({ hostelSGSP2: HostelSGSP2 }));
  },
  setHostelSGSP1: (HostelSGSP1) => {
    set(() => ({ hostelSGSP1: HostelSGSP1 }));
  },
  setHostelSGS: (HostelSGS) => {
    set(() => ({ hostelSGS: HostelSGS }));
  },
  setInstiSGS: (InstiSGS) => {
    set(() => ({ instiSGS: InstiSGS }));
  },
  setInstiSS: (InstiSS) => {
    set(() => ({ instiSS: InstiSS }));
  },
  setInstiIAR: (InstiIAR) => {
    set(() => ({ instiIAR: InstiIAR }));
  },
  setInstiHAS: (InstiHAS) => {
    set(() => ({ instiHAS: InstiHAS }));
  },
  setInstiCULSECL: (InstiCULSECL) => {
    set(() => ({ instiCULSECL: InstiCULSECL }));
  },
  setInstiCULSECA: (InstiCULSECA) => {
    set(() => ({ instiCULSECA: InstiCULSECA }));
  },
  setInstiCOCAS: (InstiCOCAS) => {
    set(() => ({ instiCOCAS: InstiCOCAS }));
  },
  setInstiAAS: (InstiAAS) => {
    set(() => ({ instiAAS: InstiAAS }));
  }
});

const useVoteStore = create(voteStore);
export default useVoteStore;
