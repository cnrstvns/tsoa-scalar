export interface Major {
  /** Unique identifier for the object */
  id: string;

  /** The major's name */
  name: string;

  /** The major's description */
  description: string;

  /** The college which the major belongs to */
  college: string;

  /** The number of students enrolled in the program */
  studentCount: number;
}
