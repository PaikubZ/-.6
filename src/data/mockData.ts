import { Announcement, Lesson, GameItem, StudentWork, TeacherItem } from '../types';

export const ANNOUNCEMENTS: Announcement[] = [];

export const LESSONS: Lesson[] = [
  // ================= ภาคปลาย (Semester 2) =================
  {
    id: 'lesson-term2-1',
    semester: 2,
    termLabel: 'ภาคปลาย',
    week: 1,
    dateRange: '3 - 6 พ.ย. 69',
    unitNumber: 1,
    unitName: 'การแก้ปัญหาอย่างเป็นระบบ & ผังงาน (Flowchart)',
    title: 'การแก้ปัญหาอย่างเป็นระบบ & การเขียนรหัสลำลองและผังงาน (Flowchart)',
    subtitle: 'ขั้นตอนการแก้ปัญหา 4 ขั้นตอน แนวคิดการทำงานเชิงตรรกะ พร้อมฝึกเขียนรหัสลำลอง (Pseudocode) และการใช้สัญลักษณ์ผังงาน (Flowchart)',
    description: 'เรียนรู้ขั้นตอนการแก้ปัญหาอย่างเป็นระบบ 4 ขั้นตอน แนวคิดการทำงานเชิงตรรกะ พร้อมฝึกเขียนรหัสลำลอง (Pseudocode) และการใช้สัญลักษณ์ผังงาน (Flowchart)',
    tasks: [
      'ชมสื่อวิดีโอการเรียนรู้: เรื่อง "วิทยาการคำนวณ EP4 ความสำคัญของปัญหา (ลิปดา&โพล่า)" และ "สื่อการเรียนการสอน เรื่อง ผังงาน (Flowchart)"',
      'เรียนรู้ขั้นตอนการแก้ปัญหาอย่างเป็นระบบ: ศึกษากระบวนการแก้ปัญหา 4 ขั้นตอน และแนวคิดการทำงานเชิงตรรกะ (ลำดับขั้นตอน, มีเงื่อนไข, วนซ้ำ)',
      'ศึกษาการเขียนรหัสลำลองและผังงาน: การใช้คำบรรยายอธิบายขั้นตอน (Pseudocode) และการใช้สัญลักษณ์รูปภาพเขียนผังงาน (Flowchart) ตามหลักการและโครงสร้าง 3 รูปแบบ',
      'ทำใบงานปฏิบัติ: เรื่อง "การแก้ปัญหาอย่างเป็นระบบ" เพื่อวัดความเข้าใจ'
    ],
    keyPoints: [
      'กระบวนการแก้ปัญหา 4 ขั้นตอน: ได้แก่ 1. วิเคราะห์ปัญหา 2. วางแผนการแก้ไขปัญหา 3. ดำเนินการแก้ปัญหา และ 4. ตรวจสอบและปรับปรุง',
      'แนวคิดการทำงาน 3 รูปแบบ: ได้แก่ แนวคิดแบบเป็นลำดับขั้นตอน, แนวคิดแบบมีเงื่อนไข และแนวคิดแบบวนซ้ำ',
      'การถ่ายทอดความคิดในการแก้ปัญหา: การเขียนรหัสลำลอง (Pseudocode) ด้วยข้อความ และการเขียนผังงาน (Flowchart) ด้วยสัญลักษณ์มาตรฐาน (Terminator, Process, Decision, Flow line, Connector) ตามโครงสร้างแบบเรียงลำดับ แบบทางเลือก และแบบทำซ้ำ'
    ],
    pdfTitle: 'ใบงานปฏิบัติที่ 1: การแก้ปัญหาอย่างเป็นระบบและผังงาน Flowchart.pdf',
    pdfPages: 4,
    pdfSize: '2.5 MB',
    learningObjectives: [
      'อธิบายกระบวนการแก้ปัญหา 4 ขั้นตอนได้อย่างถูกต้อง',
      'อธิบายแนวคิดการทำงานเชิงตรรกะ 3 รูปแบบ (ลำดับขั้นตอน, มีเงื่อนไข, วนซ้ำ) ได้',
      'เขียนรหัสลำลองและผังงาน (Flowchart) ด้วยสัญลักษณ์มาตรฐานได้'
    ],
    difficulty: 'ปานกลาง',
    scoreWeight: 'เก็บคะแนนสะสม 5 คะแนน',
    homeworkDue: 'ส่งใบงานปฏิบัติในคาบเรียน',
    downloadUrl: 'https://drive.google.com/file/d/1Yn33BZRXxXhmg-Be5W52TBNRxcKU6WhI/view?usp=sharing'
  },

  // ================= ภาคต้น (Semester 1) =================
  {
    id: 'lesson-term1-1',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 1,
    dateRange: '4 - 10 มิ.ย. 69',
    unitNumber: 1,
    unitName: 'การค้นหาข้อมูลและปัญญาประดิษฐ์ (AI Search)',
    title: 'การค้นหาข้อมูลบนอินเทอร์เน็ต & AI Search',
    subtitle: 'แนะนำรายวิชา ผู้สอน และหลักการเขียน Prompt',
    description: 'เริ่มต้นเรียนรู้พื้นฐานการค้นหาข้อมูลบนอินเทอร์เน็ตผ่าน Search Engine ยอดนิยม และก้าวสู่โลกปัญญาประดิษฐ์ด้วย AI Search พร้อมหลักการเขียน Prompt เบื้องต้น',
    tasks: [
      'แนะนำรายวิชาและผู้สอน',
      'การค้นหาข้อมูลบนอินเทอร์เน็ต Search Engine และ AI Search หลักการเขียน Prompt',
      'ทดลองค้นหาข้อมูล Search Engine (google.com) และ AI Search (chatgpt.com, gemini.google.com, perplexity.ai)'
    ],
    keyPoints: [
      'ความแตกต่างระหว่าง Search Engine แบบดั้งเดิม และ AI Search',
      'การทดลองใช้งาน Google, ChatGPT, Gemini และ Perplexity AI',
      'โครงสร้างพื้นฐานในการป้อนคำสั่ง (Prompting Basics)'
    ],
    pdfTitle: 'ใบความรู้และใบงานที่ 1: การค้นหาข้อมูลและ AI Search.pdf',
    pdfPages: 4,
    pdfSize: '1.8 MB',
    learningObjectives: [
      'เข้าใจกระบวนการทำงานของ Search Engine และ AI Search',
      'ทดลองค้นหาข้อมูลและเขียน Prompt เบื้องต้นได้'
    ],
    difficulty: 'ง่าย'
  },
  {
    id: 'lesson-term1-2',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 2,
    dateRange: '11 - 17 มิ.ย. 69',
    unitNumber: 1,
    unitName: 'การค้นหาข้อมูลและปัญญาประดิษฐ์ (AI Search)',
    title: 'การสืบค้นด้วย Prompt & จริยธรรมการใช้ AI',
    subtitle: 'ทบทวนความรู้ ตรวจสอบความถูกต้อง และสอบเก็บคะแนนทักษะ',
    description: 'ฝึกปฏิบัติการเขียนคำสั่ง Prompt อย่างเป็นระบบ เรียนรู้จริยธรรมในการนำ AI มาช่วยในการเรียน และวิธีการตรวจสอบข้อมูลเพื่อคัดกรองความจริงหรือข้อมูลเท็จ',
    tasks: [
      'ทบทวนความรู้ก่อนเรียน',
      'ทดลองค้นหาข้อมูลตามหลักการเขียน Prompt',
      'จริยธรรมการใช้ AI ตรวจสอบข้อมูลว่าจริงหรือเท็จ',
      'สอบเก็บคะแนนทักษะ 10 คะแนน'
    ],
    keyPoints: [
      'เทคนิคการเขียน Prompt ให้ได้คำตอบที่เจาะจงและตรงประเด็น',
      'จริยธรรมและมารยาทในการนำผลงานของ AI มาใช้งาน',
      'วิธี Fact-checking ตรวจสอบความถูกต้องของคำตอบจาก AI'
    ],
    pdfTitle: 'ใบงานที่ 2: ฝึกเขียน Prompt และจริยธรรมการใช้ AI.pdf',
    pdfPages: 4,
    pdfSize: '2.1 MB',
    learningObjectives: [
      'เขียนคำสั่ง Prompt ตามหลักการได้อย่างมีประสิทธิภาพ',
      'ตรวจสอบความน่าเชื่อถือของข้อมูลและปฏิบัติตามจริยธรรมการใช้ AI'
    ],
    difficulty: 'ปานกลาง',
    scoreWeight: '10 คะแนน',
    homeworkDue: 'สอบเก็บคะแนนทักษะในคาบเรียน'
  },
  {
    id: 'lesson-term1-3',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 3,
    dateRange: '19 - 25 มิ.ย. 69',
    unitNumber: 2,
    unitName: 'การสร้างสรรค์สื่อดิจิทัลและวิดีโอ',
    title: 'ขั้นตอนการทำวิดีโอ & การเขียน Prompt สร้างภาพและวิดีโอ',
    subtitle: 'Prompt เพื่อ Generate รูปภาพ & วิดีโอ และเตรียมสอบสัปดาห์ถัดไป',
    description: 'เรียนรู้กระบวนการผลิตวิดีโอตั้งแต่การวางโครงเรื่อง (Storyboard) และฝึกใช้คำสั่ง Prompt สั่งการ AI เพื่อสร้างรูปภาพและภาพเคลื่อนไหวประกอบผลงาน',
    tasks: [
      'ขั้นตอนการทำวิดีโอ',
      'การเขียน Prompt เพื่อ Generate รูปภาพ และวิดีโอ',
      'เอกสารทบทวนความรู้เรื่องการค้นหาข้อมูลบนอินเทอร์เน็ต สอบสัปดาห์หน้าเก็บ 10 คะแนน'
    ],
    keyPoints: [
      '3 ขั้นตอนการผลิตวิดีโอ: Pre-production, Production, Post-production',
      'การเขียน Prompt เพื่อสั่ง AI สร้างรูปภาพประกอบเรื่องราว',
      'ทบทวนเตรียมความพร้อมสำหรับสอบเก็บคะแนนสัปดาห์ที่ 4'
    ],
    pdfTitle: 'ใบความรู้ที่ 3: การทำวิดีโอและ Prompt สร้างภาพ AI.pdf',
    pdfPages: 5,
    pdfSize: '3.2 MB',
    learningObjectives: [
      'อธิบายขั้นตอนการผลิตวิดีโออย่างเป็นลำดับได้',
      'เขียน Prompt เพื่อสั่งให้ AI สร้างรูปภาพตามที่ต้องการได้'
    ],
    difficulty: 'ปานกลาง',
    scoreWeight: 'สอบสัปดาห์ถัดไป 10 คะแนน',
    homeworkDue: 'อ่านเอกสารทบทวนสอบสัปดาห์หน้า'
  },
  {
    id: 'lesson-term1-4',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 4,
    dateRange: '26 มิ.ย. - 2 ก.ค. 69',
    unitNumber: 2,
    unitName: 'การสร้างสรรค์สื่อดิจิทัลและวิดีโอ',
    title: 'การใช้งานเว็บไซต์ Canva ตัดต่อ & สอบวัดความรู้ ครั้งที่ 1',
    subtitle: 'ตัดต่อคลิปด้วย Canva, ส่งงานวิดีโอ และสอบวัดความรู้',
    description: 'ลงมือปฏิบัติการตัดต่อวิดีโอจริงบนเว็บไซต์ Canva เพิ่มเสียงดนตรี ข้อความ และเอฟเฟกต์ ส่งชิ้นงานวิดีโอฉบับสมบูรณ์ และเข้าสอบวัดความรู้ครั้งที่ 1',
    tasks: [
      'การใช้งานเว็บไซต์ Canva ตัดต่อ',
      'ส่งงานวิดีโอ',
      'สอบวัดความรู้ ครั้งที่ 1 เก็บ 10 คะแนน'
    ],
    keyPoints: [
      'เครื่องมือการตัดต่อวิดีโอใน Canva (Timeline, Audio, Text, Transitions)',
      'การ Export ไฟล์และส่งงานวิดีโอเข้าสู่ระบบ',
      'สอบวัดความรู้ ครั้งที่ 1 เรื่องการค้นหาและสื่อดิจิทัล'
    ],
    pdfTitle: 'คู่มือปฏิบัติการ: ตัดต่อวิดีโอด้วย Canva ขั้นพื้นฐาน.pdf',
    pdfPages: 6,
    pdfSize: '3.8 MB',
    learningObjectives: [
      'ตัดต่อวิดีโอสั้นด้วยเครื่องมือ Canva ได้อย่างสวยงาม',
      'ส่งงานวิดีโอและทำแบบทดสอบวัดความรู้ครั้งที่ 1'
    ],
    difficulty: 'ท้าทาย',
    scoreWeight: '10 คะแนน',
    homeworkDue: 'ส่งงานวิดีโอและสอบวัดความรู้ในคาบเรียน'
  },
  {
    id: 'lesson-term1-5',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 5,
    dateRange: '9 - 15 ก.ค. 69',
    unitNumber: 3,
    unitName: 'อินโฟกราฟิก & งานพฤกษศาสตร์โรงเรียน',
    title: 'หลักการออกแบบอินโฟกราฟิก & การใช้งาน NotebookLM',
    subtitle: 'ทำงานพฤกษศาสตร์โรงเรียน (ถั่ว) ด้วย NotebookLM และส่งงาน',
    description: 'เรียนรู้หลักการจัดวางองค์ประกอบ การเลือกใช้สีและไอคอนในอินโฟกราฟิก และการใช้เครื่องมือ NotebookLM สรุปและประมวลผลข้อมูลพฤกษศาสตร์โรงเรียนเรื่อง "ถั่ว"',
    tasks: [
      'หลักการออกแบบอินโฟกราฟิก',
      'การใช้งาน NotebookLM ทำงานพฤกษศาสตร์โรงเรียน (ถั่ว)',
      'ส่งงาน'
    ],
    keyPoints: [
      'หลักการ Visual Hierarchy และการจัดสีสำหรับอินโฟกราฟิก',
      'วิธีนำเข้าเอกสารและการสรุปประเด็นพฤกษศาสตร์ด้วย NotebookLM',
      'การแปลงข้อมูลเรื่องถั่วให้กลายเป็นภาพที่เข้าใจง่าย'
    ],
    pdfTitle: 'ใบงานที่ 5: ออกแบบอินโฟกราฟิกและ NotebookLM ถั่ว.pdf',
    pdfPages: 5,
    pdfSize: '2.9 MB',
    learningObjectives: [
      'อธิบายหลักการออกแบบอินโฟกราฟิกที่ดีได้',
      'ใช้งาน NotebookLM ช่วยรวบรวมและวิเคราะห์ข้อมูลพฤกษศาสตร์ได้'
    ],
    difficulty: 'ปานกลาง',
    homeworkDue: 'ส่งงานอินโฟกราฟิกพฤกษศาสตร์โรงเรียน (ถั่ว)'
  },
  {
    id: 'lesson-term1-6',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 6,
    dateRange: '16 - 23 ก.ค. 69',
    unitNumber: 4,
    unitName: 'แนวคิดผู้ประกอบการและการประยุกต์ใช้ AI',
    title: 'แนวคิดผู้ประกอบการ & ออกแบบผลิตภัณฑ์และโปสเตอร์โฆษณาด้วย ChatGPT',
    subtitle: 'ประยุกต์ใช้ AI สร้างสรรค์ผลิตภัณฑ์ถั่วและโปสเตอร์โฆษณา',
    description: 'สวมบทบาทนักคิดรุ่นเยาว์และผู้ประกอบการ ใช้ ChatGPT ระดมไอเดียผลิตภัณฑ์แปรรูปจากถั่ว คิดชื่อแบรนด์ สโลแกน และออกแบบโปสเตอร์โฆษณาสุดสร้างสรรค์',
    tasks: [
      'แนวคิดผู้ประกอบการ ใช้เว็บไซต์ ChatGPT ออกแบบผลิตภัณฑ์ถั่วและออกแบบโปสเตอร์โฆษณาถั่ว',
      'ออกแบบโปสเตอร์และตกแต่งด้วย Canva',
      'ส่งงาน'
    ],
    keyPoints: [
      'แนวคิดผู้ประกอบการเบื้องต้น (Entrepreneurial Mindset)',
      'ใช้ ChatGPT ระดมไอเดียคิดสูตร จุดขาย และคำโปรยโฆษณา',
      'การออกแบบโปสเตอร์โฆษณาสินค้าเพื่อดึงดูดกลุ่มเป้าหมาย'
    ],
    pdfTitle: 'ใบงานที่ 6: ผู้ประกอบการรุ่นเยาว์ ออกแบบโปสเตอร์ผลิตภัณฑ์ถั่ว.pdf',
    pdfPages: 4,
    pdfSize: '2.5 MB',
    learningObjectives: [
      'ประยุกต์ใช้ AI เพื่อระดมไอเดียทางธุรกิจอย่างสร้างสรรค์ได้',
      'ออกแบบโปสเตอร์โฆษณาผลิตภัณฑ์ที่สื่อสารจุดเด่นได้อย่างชัดเจน'
    ],
    difficulty: 'ท้าทาย',
    homeworkDue: 'ส่งโปสเตอร์โฆษณาผลิตภัณฑ์ถั่ว'
  },
  {
    id: 'lesson-term1-7',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 7,
    dateRange: '24 - 31 ก.ค. 69',
    unitNumber: 5,
    unitName: 'ทบทวนและเตรียมสอบกลางภาค',
    title: 'สรุปและทบทวนก่อนสอบกลางภาค',
    subtitle: 'ทบทวนการออกแบบอินโฟกราฟิกและการใช้งานเว็บไซต์ Canva',
    description: 'ทบทวนบทเรียนทั้งหมดตั้งแต่การค้นหาข้อมูล การเขียน Prompt การใช้งาน Canva และเตรียมความพร้อมสำหรับสอบกลางภาคทั้งภาคทฤษฎีและภาคปฏิบัติ',
    tasks: [
      'อ่านเอกสารทบทวนก่อนสอบกลางภาค เรื่องการออกแบบอินโฟกราฟิกและการใช้งานเว็บไซต์ Canva',
      'เตรียมความพร้อมสอบทฤษฎีและปฏิบัติ',
      'ติดตามและตรวจทานงานที่ส่งแล้ว'
    ],
    keyPoints: [
      'ทบทวนเครื่องมือสำคัญใน Canva',
      'แนวข้อสอบทฤษฎีการออกแบบอินโฟกราฟิก',
      'การตรวจเช็กและส่งงานค้างทั้งหมด'
    ],
    pdfTitle: 'เอกสารสรุปทบทวนก่อนสอบกลางภาค: Canva & Infographic.pdf',
    pdfPages: 6,
    pdfSize: '3.4 MB',
    learningObjectives: [
      'ทบทวนความรู้ความเข้าใจเรื่องการออกแบบอินโฟกราฟิกและการใช้ Canva',
      'เตรียมความพร้อมสำหรับการสอบกลางภาค'
    ],
    difficulty: 'ปานกลาง',
    homeworkDue: 'ตรวจสอบและส่งงานค้างก่อนสอบ'
  },
  {
    id: 'lesson-term1-8',
    semester: 1,
    termLabel: 'ภาคต้น',
    week: 8,
    dateRange: '3 - 7 ส.ค. 69',
    unitNumber: 5,
    unitName: 'ทบทวนและเตรียมสอบกลางภาค',
    title: 'กิจกรรมประจำสัปดาห์ ภาคต้น & สอบกลางภาค',
    subtitle: 'สอบทฤษฎี 10 คะแนน, สอบปฏิบัติ Canva 10 คะแนน และติดตามงานค้าง',
    description: 'สัปดาห์สอบกลางภาคประจำภาคต้น ทำการทดสอบทฤษฎี 10 ข้อ (10 คะแนน) และสอบปฏิบัติสร้างสรรค์ผลงานด้วย Canva (10 คะแนน) พร้อมติดตามงานค้างทั้งหมด',
    tasks: [
      'อ่านเอกสารทบทวนก่อนสอบกลางภาค เรื่องการออกแบบอินโฟกราฟิกและการใช้งานเว็บไซต์ Canva',
      'สอบทฤษฎี เรื่องการออกแบบอินโฟกราฟิกและการใช้งานเว็บไซต์ Canva แบบเลือกตอบ 4 ตัวเลือก จำนวน 10 ข้อ 10 คะแนน',
      'สอบปฏิบัติด้วยเว็บไซต์ Canva 10 คะแนน',
      'ติดตามงานค้าง'
    ],
    keyPoints: [
      'สอบทฤษฎี 10 ข้อ (10 คะแนน) แบบเลือกตอบ 4 ตัวเลือก',
      'สอบปฏิบัติด้วยเว็บไซต์ Canva (10 คะแนน)',
      'ติดตามและส่งงานค้างทั้งหมดเพื่อรวมคะแนนเก็บ'
    ],
    pdfTitle: 'แนวข้อสอบกลางภาคและใบงานติดตามงานค้าง สัปดาห์ที่ 8.pdf',
    pdfPages: 4,
    pdfSize: '2.0 MB',
    learningObjectives: [
      'ทำแบบทดสอบวัดความรู้ทฤษฎีการออกแบบและ Canva ได้',
      'ปฏิบัติการออกแบบชิ้นงานด้วย Canva ตามโจทย์สอบได้ถูกต้อง'
    ],
    difficulty: 'ท้าทาย',
    scoreWeight: '20 คะแนน (ทฤษฎี 10 + ปฏิบัติ 10)',
    homeworkDue: 'สัปดาห์สอบกลางภาคและส่งงานค้างทั้งหมด'
  }
];

export const GAMES_LIST: GameItem[] = [
  {
    id: 'game-interactive-coder',
    title: 'Code Runner Bot: ปริศนาเรียงคำสั่งหุ่นยนต์',
    type: 'coding',
    typeLabel: 'ฝึกเขียนโค้ด',
    provider: 'ห้องเรียน ป.6 (เล่นในเว็บได้ทันที!)',
    url: '#in-app-game',
    isExternal: false,
    thumbnail: '🤖',
    description: 'เกมฝึกคิดแบบโปรแกรมเมอร์! เรียงลำดับบล็อกคำสั่งพาหุ่นยนต์ Codi เดินเลี่ยงสิ่งกีดขวางไปเก็บดาวและเข้าสู่คอมพิวเตอร์แม่',
    ageRange: 'ป.4 - ป.6',
    stars: 5,
    timeRecommended: 'รอบละ 5-10 นาที',
    tags: ['เล่นในเว็บ', 'ตรรกะ', 'อัลกอริทึม'],
    color: 'from-blue-500 to-indigo-600',
    featured: true
  },
  {
    id: 'game-scratch',
    title: 'Scratch Studio: ชุมชนสร้างสรรค์เกมและการ์ตูน',
    type: 'creative',
    typeLabel: 'สร้างสรรค์โค้ด',
    provider: 'MIT Media Lab',
    url: 'https://scratch.mit.edu/explore/projects/games/',
    isExternal: true,
    thumbnail: '🐱',
    description: 'แหล่งรวมเกมที่สร้างโดยเด็กๆ ทั่วโลกด้วยโปรแกรม Scratch สามารถเปิดดูโค้ดข้างใน (See Inside) และนำไอเดียมาต่อยอดชิ้นงานตัวเองได้',
    ageRange: 'ป.1 - ม.3',
    stars: 5,
    timeRecommended: 'ไม่เกิน 30 นาที/วัน',
    tags: ['Scratch', 'เกมสร้างสรรค์', 'เปิดดูโค้ดได้'],
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'game-code-org',
    title: 'Code.org: Dance Party & Minecraft Hour of Code',
    type: 'coding',
    typeLabel: 'เขียนโค้ดผ่านเกม',
    provider: 'Code.org',
    url: 'https://code.org/hourofcode/overview',
    isExternal: true,
    thumbnail: '💃',
    description: 'กิจกรรมเขียนโค้ดชื่อดังระดับโลก เช่น ปาร์ตี้แดนซ์ของสัตว์เลี้ยง หรือการผจญภัยในโลก Minecraft ฝึกตรรกะ Loops & If-else อย่างสนุกสนาน',
    ageRange: 'ป.3 - ป.6',
    stars: 5,
    timeRecommended: '15-20 นาที',
    tags: ['Minecraft', 'Dance Party', 'Hour of Code'],
    color: 'from-emerald-400 to-teal-600',
    featured: true
  },
  {
    id: 'game-interland',
    title: 'Google Interland: ผจญภัยดินแดนอินเทอร์เน็ตปลอดภัย',
    type: 'logic',
    typeLabel: 'ความปลอดภัยไซเบอร์',
    provider: 'Google Safety',
    url: 'https://beinternetawesome.withgoogle.com/th_th/interland',
    isExternal: true,
    thumbnail: '🛡️',
    description: 'เกม 3 มิติสุดอลังการของ Google ที่สอนเด็กๆ ให้เป็นพลเมืองดิจิทัลที่ยอดเยี่ยม ฝ่าด่านแม่น้ำแห่งความจริง และหอคอยสมบัติรหัสผ่าน',
    ageRange: 'ป.4 - ม.3',
    stars: 5,
    timeRecommended: '15-25 นาที',
    tags: ['Google', 'ความปลอดภัย', 'ภาพสวยงาม'],
    color: 'from-sky-400 to-blue-600'
  },
  {
    id: 'game-lightbot',
    title: 'LightBot: จุดไฟตะลุยเขาวงกตตรรกะ',
    type: 'puzzle',
    typeLabel: 'พัซเซิลตรรกะ',
    provider: 'LightBot Inc.',
    url: 'https://lightbot.com/hour-of-code.html',
    isExternal: true,
    thumbnail: '💡',
    description: 'เกมระดับคลาสสิกที่ใช้แนวคิด Functions และ Procedures สั่งหุ่นยนต์เดินกระโดดไปเปิดไฟให้ครบทุกกระเบื้องสีฟ้า ฝึกคิดล่วงหน้าอย่างเป็นระบบ',
    ageRange: 'ป.4 - ป.6',
    stars: 5,
    timeRecommended: '10-15 นาที',
    tags: ['พัซเซิล', 'ฝึกสมอง', 'ยอดนิยม'],
    color: 'from-purple-500 to-indigo-700'
  },
  {
    id: 'game-quickdraw',
    title: 'Quick, Draw! with Google AI: วาดภาพให้ AI ทาย',
    type: 'creative',
    typeLabel: 'ปัญญาประดิษฐ์',
    provider: 'Google Creative Lab',
    url: 'https://quickdraw.withgoogle.com/',
    isExternal: true,
    thumbnail: '🎨',
    description: 'ทดลองเล่นกับ AI จริงๆ โดยเราต้องวาดรูปตามโจทย์ในเวลา 20 วินาที แล้วให้โครงข่ายประสาทเทียมของ Google ทายว่าเรากำลังวาดอะไร!',
    ageRange: 'ทุกวัย',
    stars: 5,
    timeRecommended: '5-10 นาที',
    tags: ['Google AI', 'วาดรูป', 'สนุกไว'],
    color: 'from-rose-400 to-pink-600'
  },
  {
    id: 'game-crazygames',
    title: 'CrazyGames: ปริศนาคณิตและตรรกะคลายเครียด',
    type: 'arcade',
    typeLabel: 'ผ่อนคลายสมอง',
    provider: 'CrazyGames',
    url: 'https://www.crazygames.com/c/puzzle',
    isExternal: true,
    thumbnail: '🧩',
    description: 'คลังเกมพัซเซิลเบาสมองที่เล่นได้ฟรีบนเบราว์เซอร์ ทั้งตัวต่อบล็อก เกมจับคู่ตัวเลข และการวางแผนเส้นทาง',
    ageRange: 'ป.1 - ป.6',
    stars: 4,
    timeRecommended: '10-15 นาที (อย่าลืมพักสายตา)',
    tags: ['พัซเซิล', 'เล่นบนเว็บ', 'คลายเครียด'],
    color: 'from-amber-500 to-red-500'
  },
  {
    id: 'game-y8',
    title: 'Y8 Games: คลังเกมอาร์เคดและผจญภัยคลาสสิก',
    type: 'arcade',
    typeLabel: 'เกมย้อนยุคผ่อนคลาย',
    provider: 'Y8.com',
    url: 'https://www.y8.com/tags/Logic',
    isExternal: true,
    thumbnail: '🎮',
    description: 'รวมมินิเกมตรรกะ ฟิสิกส์ และการทดลองจำลองวิทยาศาสตร์ เล่นสนุกเพลิดเพลินระหว่างพักเบรก',
    ageRange: 'ป.4 - ม.6',
    stars: 4,
    timeRecommended: '10-15 นาทีเท่านั้น',
    tags: ['Y8', 'อาร์เคด', 'ฟิสิกส์'],
    color: 'from-cyan-500 to-blue-600'
  }
];

export const STUDENT_WORKS: StudentWork[] = [
  // ================= ป.6/1 (ถั่วเขียว) =================
  {
    id: 'work-6-1-winner',
    title: 'อินโฟกราฟิก: ถั่วเขียว (Mung Bean) เมล็ดจิ๋วพลังแจ๋ว สู่ถั่วงอกเปี่ยมวิตามิน',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายพุฒิกานต์ ผลประสิทธิ์',
    studentClass: 'ป.6/1',
    studentNo: 1,
    likes: 88,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-emerald-500 to-teal-600',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วเขียว (Vigna radiata)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/1 เจาะลึกวงจรการงอกของเมล็ดถั่วเขียว ความเปลี่ยนแปลงทางชีววิทยา และคุณค่าของสารต้านอนุมูลอิสระ',
    highlights: [
      'แผนผังแสดงระยะการงอกจากเมล็ดสู่ต้นกล้าและถั่วงอก',
      'การใช้ไอคอนกราฟิกอธิบายสารอาหาร วิตามินซี และไฟเบอร์สูง',
      'แนะนำเมนูสุขภาพถั่วเขียวต้มน้ำตาลทรายแดง'
    ],
    teacherComment: 'ไดอะแกรมการงอกของเมล็ดถั่วเขียวสื่อความหมายเข้าใจง่ายมาก ไอคอนน่ารักและทันสมัยมากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-1-runner1',
    title: 'อินโฟกราฟิก: ถั่วเขียว (Mung Bean) คุณค่าสารอาหารเพื่อสุขภาพและเมนูสร้างสรรค์',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายณัฐวัชต์ ยิ้มละม้าย',
    studentClass: 'ป.6/1',
    studentNo: 2,
    likes: 72,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-green-500 to-emerald-600',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วเขียว (Vigna radiata)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 บันทึกสารอาหาร วิตามินซี แร่ธาตุ และเส้นใยอาหารในถั่วเขียว พร้อมแนวทางแปรรูปเป็นอาหารสุขภาพ',
    highlights: [
      'การเปรียบเทียบคุณค่าทางโภชนาการของถั่วเขียวดิบและถั่วงอก',
      'แนะนำเมนูวุ้นเส้นจากแป้งถั่วเขียวธรรมชาติ',
      'เทคนิคการเก็บรักษาเมล็ดพันธุ์ถั่วเขียวให้ปลอดมอดแมลง'
    ],
    teacherComment: 'เนื้อหามีประโยชน์มากต่อชีวิตประจำวัน จัดองค์ประกอบภาพได้อย่างสวยงามและสมดุลครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-1-runner2',
    title: 'อินโฟกราฟิก: มหัศจรรย์ถั่วเขียว (Mung Bean) การเพาะถั่วงอกและการอนุรักษ์พันธุกรรม',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงมาลิสา ครุฑกูล',
    studentClass: 'ป.6/1',
    studentNo: 3,
    likes: 65,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-teal-500 to-green-600',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วเขียว (Vigna radiata)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 นำเสนอกระบวนการเพาะถั่วงอกในครัวเรือน โครงสร้างพฤกษศาสตร์ และการดูแลรักษา',
    highlights: [
      'ขั้นตอนการเพาะถั่วงอกในขวดโหลและตะกร้าพลาสติก',
      'การบันทึกการเติบโตรายวันในคาบเรียนวิทยาการคำนวณ',
      'ภาพวาดลายเส้นแสดงใบเลี้ยงและรากแก้วที่งอกใหม่'
    ],
    teacherComment: 'ขั้นตอนการทดลองและอินโฟกราฟิกเข้าใจง่ายมาก เพื่อนๆ สามารถนำไปทดลองเพาะเองที่บ้านได้เลยค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },

  // ================= ป.6/2 (ถั่วดำ) =================
  {
    id: 'work-6-2-winner',
    title: 'อินโฟกราฟิก: ถั่วดำ (Black Bean) เมล็ดสีนิล อัศจรรย์แอนโทไซยานินบำรุงสุขภาพ',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงณัฐทิตา ถึกอ่ำ',
    studentClass: 'ป.6/2',
    studentNo: 1,
    likes: 91,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-slate-700 to-indigo-900',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วดำ (Phaseolus vulgaris)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/2 ชูจุดเด่นของเม็ดสีดำที่อุดมไปด้วยสารแอนโทไซยานิน ต้านอนุมูลอิสระและบำรุงหลอดเลือด',
    highlights: [
      'ความลับของสารแอนโทไซยานิน (Anthocyanin) ในเปลือกหุ้มเมล็ดถั่วดำ',
      'คุณประโยชน์ต่อการควบคุมน้ำตาลในเลือดและสุขภาพหลอดเลือด',
      'ข้อแนะนำการแช่เมล็ดและการต้มให้สุกนุ่มเพื่อเพิ่มคุณค่า'
    ],
    teacherComment: 'โทนสีเข้มสะดุดตาและตัดกับฟอนต์ตัวหนังสือสีขาวได้อย่างคมชัด ข้อมูลมีประโยชน์มากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-2-runner1',
    title: 'อินโฟกราฟิก: ถั่วดำ (Black Bean) แหล่งโปรตีนและใยอาหารชั้นยอดเพื่อวัยเรียน',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงณฐภัทร มณีพงค์',
    studentClass: 'ป.6/2',
    studentNo: 2,
    likes: 68,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-gray-800 to-slate-900',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วดำ (Phaseolus vulgaris)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 แนะนำคุณค่าทางโภชนาการ การควบคุมระดับน้ำตาล และเทคนิคการต้มถั่วดำให้นุ่มน่ารับประทาน',
    highlights: [
      'สารอาหารสำคัญ: ธาตุเหล็ก โพแทสเซียม และแมกนีเซียม',
      'การนำถั่วดำไปทำขนมไทย เช่น ข้าวต้มมัด และถั่วดำแกงบวด',
      'เปรียบเทียบไฟเบอร์ของถั่วดำกับถั่วชนิดอื่นๆ'
    ],
    teacherComment: 'การออกแบบเรียบง่ายแต่อ่านง่าย ชูความสำคัญของถั่วดำในสำรับอาหารไทยได้ดีเยี่ยมค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-2-runner2',
    title: 'อินโฟกราฟิก: ชีววิทยาของถั่วดำ (Black Bean) จากเมล็ดพันธุ์สู่พืชบำรุงดิน',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายพชร ณ ลำพูน',
    studentClass: 'ป.6/2',
    studentNo: 3,
    likes: 64,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-slate-700 to-zinc-900',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วดำ (Phaseolus vulgaris)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 แสดงลักษณะทางพฤกษศาสตร์ ฝัก เมล็ด และระบบรากที่ช่วยฟื้นฟูความอุดมสมบูรณ์ของดิน',
    highlights: [
      'แผนผังลักษณะทางพฤกษศาสตร์ ลำต้น ใบ และฝักถั่วดำ',
      'บทบาทของปมรากในการช่วยเพิ่มแร่ธาตุอาหารให้แก่แปลงดิน',
      'วงจรการเพาะปลูกถั่วดำในระบบเกษตรหมุนเวียน'
    ],
    teacherComment: 'เน้นด้านการอนุรักษ์ธรรมชาติและการเกษตรได้อย่างน่าสนใจ มีการจัดหมวดหมู่ข้อมูลเป็นระบบครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },

  // ================= ป.6/3 (ถั่วแดง) =================
  {
    id: 'work-6-3-winner',
    title: 'อินโฟกราฟิก: ถั่วแดง (Red Kidney Bean) เมล็ดพันธุ์พระราชทานจากยอดดอย',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงปัญณ์นภัส ไทรทองธนาพันธ์',
    studentClass: 'ป.6/3',
    studentNo: 1,
    likes: 95,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-rose-600 to-red-700',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วแดงหลวง (Phaseolus vulgaris)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/3 ถ่ายทอดเรื่องราวพืชพระราชทานโครงการหลวง ลักษณะเมล็ดคล้ายไต และสารอาหารบำรุงหัวใจ',
    highlights: [
      'ประวัติความเป็นมาของถั่วแดงหลวงในโครงการหลวง',
      'ลักษณะฝัก เมล็ด และสารอาหารที่ช่วยบำรุงหัวใจ',
      'ข้อควรระวัง: ต้องต้มให้สุกเพื่อทำลายสารไฟโตฮีแมกกลูตินิน'
    ],
    teacherComment: 'เป็นผลงานที่ครบทั้งศาสตร์และศิลป์ มีการให้ข้อควรระวังทางโภชนาการที่ถูกต้อง ดีเยี่ยมที่สุดเลยค่ะ!',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-3-runner1',
    title: 'อินโฟกราฟิก: ถั่วแดง (Red Bean) ขุมพลังโฟเลตและธาตุเหล็ก พลังงานเพื่อการเจริญเติบโต',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงธนภร นรัจฉริยางกูร',
    studentClass: 'ป.6/3',
    studentNo: 2,
    likes: 70,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-red-600 to-rose-700',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วแดง (Phaseolus vulgaris)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 วิเคราะห์สารอาหารโฟเลต ธาตุเหล็ก และไฟเบอร์สูง พร้อมข้อควรระวังในการปรุงให้สุกอย่างถูกวิธี',
    highlights: [
      'ตารางแสดงสารอาหารสำคัญ: โฟเลต ธาตุเหล็ก และโปรตีน',
      'ข้อแนะนำการแช่น้ำ 6-8 ชั่วโมงก่อนปรุงสุก',
      'ไอเดียเมนูซุปถั่วแดงและสลัดถั่วรวมเพื่อสุขภาพ'
    ],
    teacherComment: 'การจัดหน้าเป็นขั้นเป็นตอน สีแดงสดใสสะดุดตา และมีข้อมูลโภชนาการครบถ้วนครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-3-runner2',
    title: 'อินโฟกราฟิก: ถั่วแดงกับการสร้างสรรค์เมนูสุขภาพและขนมหวานคู่ภูมิปัญญา',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายจิรณัฐ ยุกตะนันท์',
    studentClass: 'ป.6/3',
    studentNo: 3,
    likes: 66,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-rose-700 to-red-800',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วแดง (Phaseolus vulgaris)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 นำเสนอการแปรรูปถั่วแดงในอาหารคาวหวาน คุณค่าสารต้านอนุมูลอิสระ และประโยชน์ต่อสุขภาพ',
    highlights: [
      'ถั่วแดงกวน ซุปถั่วแดง และเมนูสากล',
      'สารโพลีฟีนอลที่มีคุณสมบัติต้านอนุมูลอิสระในเยื่อหุ้มเมล็ด',
      'การจัดวางข้อความแบบ Minimal สบายตาและน่าอ่าน'
    ],
    teacherComment: 'การจัดเลย์เอาต์สไตล์มินิมอลทำได้ลงตัวมาก ฟอนต์อ่านง่ายและโทนสีน่ารับประทานครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },

  // ================= ป.6/4 (ถั่วฝักยาว) =================
  {
    id: 'work-6-4-winner',
    title: 'อินโฟกราฟิก: ถั่วฝักยาว (Yardlong Bean) พืชริมรั้วคู่ครัวไทย เมล็ดพันธุ์เปี่ยมชีวิต',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงวตวัน วรวรรธนทัต',
    studentClass: 'ป.6/4',
    studentNo: 1,
    likes: 89,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-green-600 to-teal-700',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วฝักยาว (Vigna unguiculata subsp. sesquipedalis)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/4 อธิบายวงจรชีวิตของถั่วฝักยาวตั้งแต่เมล็ดงอก ออกดอก ติดฝักยาว 30-60 เซนติเมตร',
    highlights: [
      'ภาพวาดโครงสร้างดอกผีเสื้อ (Papilionaceous flower)',
      'การจัดการศัตรูพืชด้วยวิธีธรรมชาติ ปลอดสารพิษ',
      'คุณค่าของวิตามินเอ วิตามินซี และสารต้านอนุมูลอิสระ'
    ],
    teacherComment: 'ลายเส้นและสีสันสดใส การเลือกใช้ภาพประกอบมีความสอดคล้องกับพฤกษศาสตร์โรงเรียนอย่างดีเลิศ!',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-4-runner1',
    title: 'อินโฟกราฟิก: ถั่วฝักยาว (Yardlong Bean) การปลูกดูแลและคุณค่าวิตามินเอ ซี บำรุงร่างกาย',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายวิชญ์วรัตม์ จิพ่วย',
    studentClass: 'ป.6/4',
    studentNo: 2,
    likes: 74,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-emerald-600 to-green-700',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วฝักยาว (Vigna unguiculata subsp. sesquipedalis)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 เจาะลึกการทำค้างเลื้อย การดูแลรักษาแบบเกษตรอินทรีย์ และวิตามินจำเป็นต่อร่างกาย',
    highlights: [
      'วิธีปักหลักทำค้างเลื้อยทรงพีระมิดประหยัดพื้นที่',
      'ตารางการให้น้ำและบำรุงด้วยปุ๋ยหมักชีวภาพ',
      'ประโยชน์ของวิตามินเอและซีในการเสริมภูมิคุ้มกัน'
    ],
    teacherComment: 'มีคำแนะนำการปฏิบัติที่นำไปใช้ปลูกได้จริงในแปลงเกษตรสาธิต น่าชื่นชมมากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-4-runner2',
    title: 'อินโฟกราฟิก: พฤกษศาสตร์ถั่วฝักยาว โครงสร้างดอกผีเสื้อและการขยายพันธุ์',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงทักษอร พิทยราชศักดิ์',
    studentClass: 'ป.6/4',
    studentNo: 3,
    likes: 67,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-green-500 to-emerald-600',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วฝักยาว (Vigna unguiculata subsp. sesquipedalis)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 วาดแผนภาพโครงสร้างดอกผีเสื้อ การผสมเกสร และการเก็บเมล็ดพันธุ์ถั่วฝักยาว',
    highlights: [
      'กลีบดอกมาตรฐาน กลีบปีก และกลีบก้นหอยของดอกถั่ว',
      'วิธีการตากและเก็บฝักแก่เพื่อคัดเมล็ดพันธุ์สมบูรณ์',
      'เกร็ดความรู้พืชตระกูลถั่วกับการเพิ่มไนโตรเจน'
    ],
    teacherComment: 'การลงสีดอกไม้และรายละเอียดทางพฤกษศาสตร์ทำได้ประณีตสวยงามมากค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },

  // ================= ป.6/5 (ถั่วพู) =================
  {
    id: 'work-6-5-winner',
    title: 'อินโฟกราฟิก: ถั่วพู (Winged Bean) ซูเปอร์ฟู้ด 4 ปีก พืชพื้นบ้านสารพัดประโยชน์',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายศุภสิงห์ ยุวนิชยากุล',
    studentClass: 'ป.6/5',
    studentNo: 1,
    likes: 96,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-green-600 to-emerald-700',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วพู (Psophocarpus tetragonolobus)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/5 แนะนำพืชผักพื้นถิ่นที่กินได้ทุกส่วน ทั้งยอดอ่อน ดอก ฝัก หัวใต้ดิน และเมล็ด',
    highlights: [
      'แผนภาพแสดง 5 ส่วนที่รับประทานได้ของถั่วพู',
      'การเปรียบเทียบปริมาณแคลเซียมและธาตุเหล็กกับพืชชนิดอื่น',
      'วิธีปลูกและดูแลรักษาในแปลงเกษตรสาธิต'
    ],
    teacherComment: 'ชี้ให้เห็นคุณค่าของพืชผักพื้นบ้านไทยได้อย่างยอดเยี่ยม องค์ประกอบภาพลงตัวมากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-5-runner1',
    title: 'อินโฟกราฟิก: ถั่วพู (Winged Bean) มหัศจรรย์แคลเซียมและโปรตีนจากพืชผักริมรั้ว',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายสิรภพ เยาวพงษ์อารีย์',
    studentClass: 'ป.6/5',
    studentNo: 2,
    likes: 71,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-emerald-600 to-teal-700',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วพู (Psophocarpus tetragonolobus)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 เปรียบเทียบปริมาณแคลเซียม ธาตุเหล็ก และประโยชน์ของฝัก 4 ครีบอันเป็นเอกลักษณ์',
    highlights: [
      'สารอาหารสำคัญ: แคลเซียมสูงช่วยเสริมสร้างกระดูกและฟัน',
      'การนำฝักสด ยอดอ่อน และหัวถั่วพูมาปรุงอาหารไทย',
      'ข้อดีของการเป็นพืชทนแล้งและศัตรูพืชน้อย'
    ],
    teacherComment: 'นำเสนอข้อดีของถั่วพูได้รอบด้าน กราฟิกน่ารักและใช้สีสันสบายตามากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-5-runner2',
    title: 'อินโฟกราฟิก: การปลูกและการขยายพันธุ์ถั่วพู (Winged Bean) ในแปลงสวนพฤกษศาสตร์',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงกัญญาวีร์ วัฒนกิจศิริ',
    studentClass: 'ป.6/5',
    studentNo: 3,
    likes: 63,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-teal-600 to-green-700',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วพู (Psophocarpus tetragonolobus)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 แสดงคู่มือการปลูกถั่วพู การทำซุ้มเลื้อย และการนำไปประกอบอาหารพื้นบ้านไทย',
    highlights: [
      'ขั้นตอนการเพาะเมล็ดและการแช่น้ำอุ่นเร่งการงอก',
      'การทำค้างเลื้อยและระยะเวลาเก็บเกี่ยวฝักอ่อน',
      'การอนุรักษ์พันธุกรรมพืชผักพื้นบ้านไทย'
    ],
    teacherComment: 'การอธิบายขั้นตอนการเพาะปลูกทำได้ชัดเจนมาก เป็นแนวทางให้เพื่อนๆ นำไปใช้ได้จริงค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },

  // ================= ป.6/6 (ถั่วลันเตา) =================
  {
    id: 'work-6-6-winner',
    title: 'อินโฟกราฟิก: ถั่วลันเตา (Sweet Pea) หวานกรอบเปี่ยมสารอาหาร พืชวิจัยเกรเกอร์ เมนเดล',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายวริทธ์ธร วรวัฒนเมธีกุล',
    studentClass: 'ป.6/6',
    studentNo: 1,
    likes: 92,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-lime-500 to-emerald-600',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วลันเตา (Pisum sativum)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/6 เชื่อมโยงประวัติศาสตร์พันธุศาสตร์ของเมนเดลเข้ากับกายวิภาคของต้นถั่วลันเตาในสวนโรงเรียน',
    highlights: [
      'เรื่องราวการทดลองทางพันธุศาสตร์ของเกรเกอร์ เมนเดล',
      'โครงสร้างดอก ก้านมือเกาะ (Tendrils) และฝักถั่วลันเตา',
      'คุณค่าของสารลูทีนและซีแซนทีนช่วยบำรุงสายตา'
    ],
    teacherComment: 'บูรณาการประวัติศาสตร์วิทยาศาสตร์กับการออกแบบอินโฟกราฟิกได้อย่างน่าทึ่ง ลายเส้นสดใสและอ่านเพลินมากค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-6-runner1',
    title: 'อินโฟกราฟิก: ถั่วลันเตา (Snow Pea) คุณค่าสารลูทีนบำรุงสายตาและไฟเบอร์สูง',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงของขวัญ กุลตวนิช',
    studentClass: 'ป.6/6',
    studentNo: 2,
    likes: 77,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-green-500 to-emerald-600',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วลันเตา (Pisum sativum)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 ชี้ให้เห็นสารลูทีน ซีแซนทีน และวิตามินเคในฝักถั่วลันเตาหวานกรอบ',
    highlights: [
      'สารอาหารสำคัญต่อสายตาและการมองเห็นของเด็กวัยเรียน',
      'ความแตกต่างระหว่างถั่วลันเตาฝักสดและถั่วลันเตายอดอ่อน (โต้วเหมี่ยว)',
      'เคล็ดลับการลวกให้สีเขียวสดและคงคุณค่าวิตามิน'
    ],
    teacherComment: 'การเลือกหัวข้อลูทีนบำรุงสายตาตอบโจทย์เด็กยุคดิจิทัล ดีไซน์สวยและน่าสนใจมากค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-6-runner2',
    title: 'อินโฟกราฟิก: พฤกษศาสตร์ต้นถั่วลันเตา มือเกาะ (Tendrils) ดอก และการเจริญเติบโต',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายศุภณัฐร์ ศุภพิมล',
    studentClass: 'ป.6/6',
    studentNo: 3,
    likes: 69,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-emerald-600 to-teal-700',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วลันเตา (Pisum sativum)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 วาดโครงสร้างก้านมือเกาะของถั่วลันเตา การขึ้นค้าง และการเก็บเกี่ยวฝักสด',
    highlights: [
      'กลไกการพันเลื้อยของมือเกาะ (Tendril thigmotropism)',
      'ลักษณะของดอกและการผสมเกสรภายในดอกเดียวกัน',
      'การเก็บเกี่ยวฝักสดเพื่อคงความหวานกรอบตามธรรมชาติ'
    ],
    teacherComment: 'อธิบายหลักการเคลื่อนไหวของพืชทางชีววิทยาได้อย่างชัดเจน อินโฟกราฟิกน่าติดตามมากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },

  // ================= ป.6/7 (ถั่วเหลือง) =================
  {
    id: 'work-6-7-winner',
    title: 'อินโฟกราฟิก: ถั่วเหลือง (Soybean) มหัศจรรย์โปรตีนแห่งพฤกษาพรรณ นวัตกรรมอาหารแห่งอนาคต',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายธีร์ธัชช์ ศรีชูศิลป์',
    studentClass: 'ป.6/7',
    studentNo: 1,
    likes: 98,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-amber-500 to-yellow-600',
    awardRank: 'winner',
    awardTitle: 'รางวัลชนะเลิศ',
    awardBadge: '🥇 ชนะเลิศ',
    botanicalTopic: 'ถั่วเหลือง (Glycine max)',
    summary: 'ผลงานชนะเลิศอันดับ 1 ของห้อง ป.6/7 ออกแบบอินโฟกราฟิกโครงสร้างเมล็ดถั่วเหลือง วงจรการเจริญเติบโต และการแปรรูปเป็นโปรตีนเกษตร',
    highlights: [
      'ศึกษาลักษณะทางพฤกษศาสตร์ ลำต้น ใบ ฝัก และเมล็ดถั่วเหลืองอย่างละเอียด',
      'ออกแบบโครงสร้างการจัดวางด้วย Canva มี Visual Hierarchy และโทนสีทอง-เขียวอย่างมืออาชีพ',
      'แสดงการแปรรูปเป็นนมถั่วเหลือง เต้าหู้ และโปรตีนเกษตรของมหาวิทยาลัยเกษตรศาสตร์'
    ],
    teacherComment: 'การจัดวางเลย์เอาต์ระดับมืออาชีพ ใช้คู่สีทอง-เขียวพฤกษศาสตร์ได้สมบูรณ์แบบ ข้อมูลถูกต้องตามหลักสวนพฤกษศาสตร์โรงเรียน ขอชื่นชมครับ!',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-7-runner1',
    title: 'อินโฟกราฟิก: ถั่วเหลือง (Soybean) ราชาแห่งโปรตีนพืช และผลิตภัณฑ์แปรรูป มก.',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กหญิงปุณยจิรา สาหร่ายทอง',
    studentClass: 'ป.6/7',
    studentNo: 2,
    likes: 75,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1585499193151-0f50d54c4e54?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-amber-500 to-orange-600',
    awardRank: 'runner1',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 1',
    awardBadge: '🥈 รองอันดับ 1',
    botanicalTopic: 'ถั่วเหลือง (Glycine max)',
    summary: 'ผลงานรองชนะเลิศอันดับ 1 นำเสนอคุณค่าของนมถั่วเหลือง เต้าหู้ และโปรตีนเกษตรของมหาวิทยาลัยเกษตรศาสตร์',
    highlights: [
      'ประวัติการคิดค้นโปรตีนเกษตรจากถั่วเหลืองของมหาวิทยาลัยเกษตรศาสตร์',
      'คุณประโยชน์ของกรดอะมิโนจำเป็นครบถ้วนเทียบเท่าโปรตีนจากเนื้อสัตว์',
      'กระบวนการทำน้ำนมถั่วเหลืองสดเพื่อสุขภาพ'
    ],
    teacherComment: 'สะท้อนเอกลักษณ์ความภาคภูมิใจในมหาวิทยาลัยเกษตรศาสตร์ได้อย่างยอดเยี่ยม การจัดหน้าประณีตมากค่ะ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  },
  {
    id: 'work-6-7-runner2',
    title: 'อินโฟกราฟิก: คุณค่าทางโภชนาการของถั่วเหลือง (Soybean) กรดอะมิโนจำเป็นและไอโซฟลาโวน',
    category: 'infographic',
    categoryLabel: 'อินโฟกราฟิกพฤกษศาสตร์',
    studentName: 'เด็กชายกฤษญา อุกฤษฎ์ดุษฎี',
    studentClass: 'ป.6/7',
    studentNo: 3,
    likes: 68,
    date: 'สิงหาคม 2569',
    imageSrc: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=85',
    previewColor: 'from-yellow-600 to-amber-700',
    awardRank: 'runner2',
    awardTitle: 'รางวัลรองชนะเลิศอันดับ 2',
    awardBadge: '🥉 รองอันดับ 2',
    botanicalTopic: 'ถั่วเหลือง (Glycine max)',
    summary: 'ผลงานรองชนะเลิศอันดับ 2 เจาะลึกกรดอะมิโนจำเป็น สารไอโซฟลาโวน และบทบาทของถั่วเหลืองต่อสุขภาพทุกช่วงวัย',
    highlights: [
      'สารไอโซฟลาโวน (Isoflavones) และการต้านอนุมูลอิสระ',
      'การเปรียบเทียบโปรตีนถั่วเหลืองกับพืชตระกูลถั่วชนิดอื่น',
      'แนวทางการบริโภคถั่วเหลืองอย่างสมดุลในชีวิตประจำวัน'
    ],
    teacherComment: 'เจาะลึกทางโภชนาการได้ลึกซึ้ง กราฟิกและตารางเปรียบเทียบเข้าใจง่ายมากครับ',
    toolsUsed: ['Canva for Education', 'สวนพฤกษศาสตร์โรงเรียน']
  }
];

export const TEACHERS_LIST: TeacherItem[] = [
  {
    id: 'teacher-1',
    name: 'อาจารย์อนงค์นาฏ',
    shortName: 'อ.อนงค์นาฏ',
    role: 'อาจารย์ผู้สอน',
    subject: 'สอนเทคโนโลยี ป.6',
    imageUrl: '/assets/aistudio/technologygrade6_1afae94b.png',
    room: 'ห้องปฏิบัติการคอมพิวเตอร์',
    facebookTag: '#เทคโนโลยีป6 #สอนคอมพิวเตอร์ #ครูอนงค์นาฏ'
  },
  {
    id: 'teacher-2',
    name: 'อาจารย์วัชระ',
    shortName: 'อ.วัชระ',
    role: 'อาจารย์ผู้สอน',
    subject: 'สอนเทคโนโลยี ป.6',
    imageUrl: '/assets/aistudio/technologygrade6__1__5f6d298c.png',
    room: 'ห้องปฏิบัติการคอมพิวเตอร์',
    facebookTag: '#เทคโนโลยีป6 #สอนเทคโนโลยี #ครูวัชระ'
  },
  {
    id: 'teacher-3',
    name: 'อาจารย์กมเลศ',
    shortName: 'อ.กมเลศ',
    role: 'อาจารย์ผู้สอน',
    subject: 'สอนเทคโนโลยี ป.6',
    imageUrl: '/assets/aistudio/technologygrade6__2__cbc69bcd.png',
    room: 'ห้องปฏิบัติการคอมพิวเตอร์',
    facebookTag: '#เทคโนโลยีป6 #สอนเทคโนโลยี #ครูกมเลศ'
  },
  {
    id: 'teacher-4',
    name: 'อาจารย์ธิติ',
    shortName: 'อ.ธิติ',
    role: 'อาจารย์ผู้สอน',
    subject: 'สอนเทคโนโลยี ป.6',
    imageUrl: '/assets/aistudio/technologygrade6__3__ed1026f0.png',
    room: 'ห้องปฏิบัติการคอมพิวเตอร์',
    facebookTag: '#เทคโนโลยีป6 #สอนเทคโนโลยี #ครูธิติ'
  }
];

export const FAQS = [
  {
    q: 'หนู/ผม ส่งงานไม่ทันตามกำหนดเวลา ต้องทำอย่างไร?',
    a: 'สามารถส่งย้อนหลังได้ครับ โดยนำลิงก์ชิ้นงานหรือไฟล์มาส่งที่ห้องปฏิบัติการคอมพิวเตอร์กับอาจารย์ผู้สอนในช่วงเวลาพัก หรือส่งผ่านฟอร์มในระบบได้เลยครับ อาจารย์จะตรวจและให้คะแนนตามเกณฑ์ครับ'
  },
  {
    q: 'ที่บ้านไม่มีคอมพิวเตอร์ จะฝึกทำการบ้านหรือศึกษาเพิ่มเติมอย่างไร?',
    a: 'เว็บไซต์และเครื่องมือที่เรียน เช่น Canva หรือเครื่องมือค้นหา สามารถเปิดใช้งานผ่านแท็บเล็ตหรือสมาร์ตโฟนได้ หรือสามารถมาใช้เครื่องคอมพิวเตอร์ที่โรงเรียนในช่วงพักกลางวันและหลังเลิกเรียนได้ครับ'
  },
  {
    q: 'ลืมรหัสผ่านบัญชีอีเมลหรือติดปัญหาการเข้าใช้งาน ต้องติดต่อใคร?',
    a: 'สามารถติดต่ออาจารย์ผู้สอนประจำวิชาได้ที่ห้องปฏิบัติการคอมพิวเตอร์ หรือส่งข้อความผ่านฟอร์มติดต่อด้านบน พร้อมระบุชื่อ-นามสกุล ชั้น และเลขที่ อาจารย์จะช่วยตรวจสอบและแก้ไขให้ครับ'
  },
  {
    q: 'ใบงานหรือชิ้นงานที่ต้องส่ง ต้องพิมพ์สีไหม?',
    a: 'สามารถพิมพ์เป็นขาวดำ หรือส่งไฟล์ดิจิทัลในระบบได้เลยครับ อาจารย์เน้นที่ความคิดสร้างสรรค์และความถูกต้องของเนื้อหาเป็นหลัก ไม่จำเป็นต้องเสียค่าพิมพ์สีครับ'
  }
];
