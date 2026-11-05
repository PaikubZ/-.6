export type PageTab = 'home' | 'lessons' | 'games' | 'gallery' | 'contact';

export type AnnouncementCategory = 'การบ้าน' | 'วันสอบ' | 'กิจกรรม' | 'บทเรียนใหม่' | 'ประกาศทั่วไป';

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: AnnouncementCategory;
  categoryColor: string;
  summary: string;
  content: string;
  dueDate?: string;
  isImportant?: boolean;
  actionText?: string;
  actionTab?: PageTab;
}

export interface Lesson {
  id: string;
  semester: 1 | 2; // 1 = ภาคต้น, 2 = ภาคปลาย
  termLabel?: string;
  week: number;
  dateRange: string;
  unitNumber: number;
  unitName: string;
  title: string;
  subtitle: string;
  description: string;
  tasks: string[];
  keyPoints: string[];
  pdfTitle: string;
  pdfPages: number;
  pdfSize: string;
  learningObjectives: string[];
  difficulty: 'ง่าย' | 'ปานกลาง' | 'ท้าทาย';
  homeworkDue?: string;
  scoreWeight?: string;
  downloadUrl?: string;
}

export interface GameItem {
  id: string;
  title: string;
  type: 'coding' | 'logic' | 'puzzle' | 'creative' | 'arcade';
  typeLabel: string;
  provider: string;
  url: string;
  isExternal: boolean;
  thumbnail: string;
  description: string;
  ageRange: string;
  stars: number;
  timeRecommended: string;
  tags: string[];
  color: string;
  featured?: boolean;
}

export type AwardRank = 'winner' | 'runner1' | 'runner2';

export interface StudentWork {
  id: string;
  title: string;
  category: 'infographic' | 'scratch' | 'flowchart' | 'presentation';
  categoryLabel: string;
  studentName: string;
  studentNickname?: string;
  studentClass: string;
  studentNo?: number;
  likes: number;
  hasLiked?: boolean;
  date: string;
  imageSrc: string;
  previewColor?: string;
  summary: string;
  highlights: string[];
  teacherComment: string;
  toolsUsed: string[];
  scoreGrade?: string;
  awardRank: AwardRank;
  awardTitle: string;
  awardBadge: string;
  botanicalTopic?: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  shortName: string;
  role: string;
  subject: string;
  imageUrl?: string;
  avatarEmoji?: string;
  room: string;
  email?: string;
  facebookTag?: string;
}

export interface ContactMessageForm {
  studentName: string;
  studentClass: string;
  studentNumber: string;
  targetTeacher: string;
  topic: string;
  message: string;
  parentEmailOrLine?: string;
}
