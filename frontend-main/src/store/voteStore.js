import create from "zustand";

const voteStore = (set) => ({
  instiAAS: null,
  instiAASPreferences: null,
  instiRAS: null,
  instiRASPreferences: null,
  instiCOCAS: null,
  instiCOCASPreferences: null,
  instiCULSECA: null,
  instiCULSECAPreferences: null,
  instiCULSECL: null,
  instiCULSECLPreferences: null,
  instiHAS: null,
  instiHASPreferences: null,
  instiIAR: null,
  instiIARPreferences: null,
  instiSS: null,
  instiSSPreferences: null,
  instiSGS: null,
  instiSGSPreferences: null,
  hostelSGS: null,
  hostelSGSPreferences: null,
  hostelHHS: null,
  hostelHHSPreferences: null,
  hostelSS: null,
  hostelSSPreferences: null,
  hostelHL: null,
  hostelHLPreferences: null,
  hostelLL: null,
  hostelLLPreferences: null,
  hostelSL: null,
  hostelSLPreferences: null,
  hostelTAS: null,
  hostelTASPreferences: null,
  departmentLegislator: null,
  departmentPreferences: null,
  setDepartmentLegislator: (DepartmentLegislator) => {
    set(() => ({departmentLegislator: DepartmentLegislator}))
  },
  setDepartmentPreferences: (DepartmentPreferences) => {
    set(() => ({departmentPreferences: DepartmentPreferences}))
  },
  setHostelSGS: (HostelSGS) => {
    set(() => ({ hostelSGS: HostelSGS }));
  },
  setHostelSGSPreferences: (HostelSGSPreferences) => {
    set(() => ({ hostelSGSPreferences: HostelSGSPreferences }));
  },
  setHostelHHS: (HostelHHS) => {
    set(() => ({ hostelHHS: HostelHHS }));
  },
  setHostelHHSPreferences: (HostelHHSPreferences) => {
    set(() => ({ hostelHHSPreferences: HostelHHSPreferences }));
  },
  setHostelSS: (HostelSS) => {
    set(() => ({ hostelSS: HostelSS }));
  },
  setHostelSSPreferences: (HostelSSPreferences) => {
    set(() => ({ hostelSSPreferences: HostelSSPreferences }));
  },
  setHostelHL: (HostelHL) => {
    set(() => ({ hostelHL: HostelHL }));
  },
  setHostelHLPreferences: (HostelHLPreferences) => {
    set(() => ({ hostelHLPreferences: HostelHLPreferences }));
  },
  setHostelLL: (HostelLL) => {
    set(() => ({ hostelLL: HostelLL }));
  },
  setHostelLLPreferences: (HostelLLPreferences) => {
    set(() => ({ hostelLLPreferences: HostelLLPreferences }));
  },
  setHostelSL: (HostelSL) => {
    set(() => ({ hostelSL: HostelSL }));
  },
  setHostelSLPreferences: (HostelSLPreferences) => {
    set(() => ({ hostelSLPreferences: HostelSLPreferences }));
  },
  setHostelTAS: (HostelTAS) => {
    set(() => ({ hostelTAS: HostelTAS }));
  },
  setHostelTASPreferences: (HostelTASPreferences) => {
    set(() => ({ hostelTASPreferences: HostelTASPreferences }));
  },
  setInstiSGS: (InstiSGS) => {
    set(() => ({ instiSGS: InstiSGS }));
  },
  setInstiSGSPreferences: (InstiSGSPreferences) => {
    set(() => ({ instiSGSPreferences: InstiSGSPreferences }));
  },
  setInstiSS: (InstiSS) => {
    set(() => ({ instiSS: InstiSS }));
  },
  setInstiSSPreferences: (InstiSSPreferences) => {
    set(() => ({ instiSSPreferences: InstiSSPreferences }));
  },
  setInstiIAR: (InstiIAR) => {
    set(() => ({ instiIAR: InstiIAR }));
  },
  setInstiIARPreferences: (InstiIARPreferences) => {
    set(() => ({ instiIARPreferences: InstiIARPreferences }));
  },
  setInstiHAS: (InstiHAS) => {
    set(() => ({ instiHAS: InstiHAS }));
  },
  setInstiHASPreferences: (InstiHASPreferences) => {
    set(() => ({ instiHASPreferences: InstiHASPreferences }));
  },
  setInstiCULSECL: (InstiCULSECL) => {
    set(() => ({ instiCULSECL: InstiCULSECL }));
  },
  setInstiCULSECLPreferences: (InstiCULSECLPreferences) => {
    set(() => ({ instiCULSECLPreferences: InstiCULSECLPreferences }));
  },
  setInstiCULSECA: (InstiCULSECA) => {
    set(() => ({ instiCULSECA: InstiCULSECA }));
  },
  setInstiCULSECAPreferences: (InstiCULSECAPreferences) => {
    set(() => ({ instiCULSECAPreferences: InstiCULSECAPreferences }));
  },
  setInstiCOCAS: (InstiCOCAS) => {
    set(() => ({ instiCOCAS: InstiCOCAS }));
  },
  setInstiCOCASPreferences: (InstiCOCASPreferences) => {
    set(() => ({ instiCOCASPreferences: InstiCOCASPreferences }));
  },
  setInstiAAS: (InstiAAS) => {
    set(() => ({ instiAAS: InstiAAS }));
  },
  setInstiAASPreferences: (InstiAASPreferences) => {
    set(() => ({ instiAASPreferences: InstiAASPreferences }));
  },
  setInstiRAS: (InstiRAS) => {
    set(() => ({ instiRAS: InstiRAS }));
  },
  setInstiRASPreferences: (InstiRASPreferences) => {
    set(() => ({ instiRASPreferences: InstiRASPreferences }));
  },
});

const useVoteStore = create(voteStore);
export default useVoteStore;
