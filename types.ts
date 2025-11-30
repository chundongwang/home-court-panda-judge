export interface CaseData {
  plaintiffName: string;
  plaintiffStatement: string;
  defendantName: string;
  defendantStatement: string;
}

export interface Verdict {
  plaintiffResponsibility: number;
  defendantResponsibility: number;
  decree: string;
  plaintiffReparation: string;
  defendantReparation: string;
}

export enum PartyRole {
  PLAINTIFF = 'PLAINTIFF',
  DEFENDANT = 'DEFENDANT',
}

export interface PartyConfig {
  role: PartyRole;
  label: string;
  placeholderName: string;
  placeholderStatement: string;
  color: string;
  icon: string;
}
