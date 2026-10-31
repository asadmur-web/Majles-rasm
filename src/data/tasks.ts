export interface GameTask {
  id: number;
  title: string;
  description: string;
  validator: string;
}

export const GAME_TASKS: GameTask[] = [
  { id: 1, title: 'مهمة خلط الألوان الأساسية', description: 'ادمج اللونين الأزرق والأصفر في لوحة الدمج الجانبية للحصول على الأخضر.', validator: 'colorMix' },
  { id: 2, title: 'مهمة الخط المتصل السريع', description: 'ارسم خطاً أفقياً صغيراً في إطار المهمة دون رفع اليد.', validator: 'continuousLine' },
  { id: 3, title: 'مهمة الدائرة المصغرة', description: 'ارسم دائرة مغلقة صغيرة داخل صندوق المهمة خلال 5 ثوانٍ.', validator: 'drawCircle' },
  { id: 4, title: 'مهمة التنظيف الدقيق', description: 'استخدم الممحاة لمسح 3 نقاط عشوائية تظهر في إطار المهمة.', validator: 'erasePoints' },
  { id: 5, title: 'مهمة تدرج الظل الخفيف', description: 'استخدم اللون الأسود بنسبة شفافة 20% لتظليل زاوية إطار المهمة.', validator: 'shadeCorner' },
  { id: 6, title: 'مهمة الزاوية العليا', description: 'ارسم مربعاً صغيراً جداً في الزاوية اليسرى العليا لصندوق المهمة.', validator: 'drawSmallSquare' },
  { id: 7, title: 'مهمة التوازن النقطي', description: 'ضع 3 نقاط زرقاء متفرقة داخل إطار المهمة.', validator: 'placeBlueDots' },
  { id: 8, title: 'مهمة التتبع المتعرج', description: 'صل بين نقطتين بخط متعرج سريع داخل إطار المهمة.', validator: 'zigzagLine' },
  { id: 9, title: 'مهمة تطهير البقع', description: 'اضغط على أزرار التطهير العشوائية الخضراء داخل إطار المهمة.', validator: 'cleanSpots' },
  { id: 10, title: 'مهمة التعبئة النصفية', description: 'املأ نصف مساحة المهمة باللون الأصفر دون تجاوز الحد.', validator: 'fillHalf' },
  { id: 11, title: 'مهمة الفرشاة المستمرة', description: 'استخدم فرشاة الرسم لمدة 3 ثوانٍ متواصلة داخل صندوق المهمة.', validator: 'continuousBrush' },
  { id: 12, title: 'مهمة اللون المعاكس', description: 'ضع نقطة بيضاء فوق مساحة سوداء داخل المهمة.', validator: 'oppositeColor' },
  { id: 13, title: 'مهمة التقاطع الدقيق', description: 'ارسم علامة زائد (+) في منتصف إطار المهمة.', validator: 'drawPlus' },
  { id: 14, title: 'مهمة الإطار الخارجي', description: 'ارسم إطاراً مربعاً يحيط بمنطقة العمل المصغرة للمهمة.', validator: 'drawFrame' },
  { id: 15, title: 'مهمة التركيز الصامت', description: 'ابقِ بدون تحريك الماوس أو الفرشاة داخل المهمة لمدة 3 ثوانٍ.', validator: 'stayStill' },
  { id: 16, title: 'مهمة الدمج الثلاثي', description: 'ادمج الأحمر والأصفر والأبيض في لوحة الدمج للحصول على درجة لحمية.', validator: 'tripleMix' },
  { id: 17, title: 'مهمة تكرار الخطوط', description: 'ارسم خطين عموديين متوازيين داخل صندوق المهمة.', validator: 'parallelLines' },
  { id: 18, title: 'مهمة النقاط الأربع', description: 'ضع 4 نقاط في زوايا إطار المهمة الأربع.', validator: 'fourCorners' },
  { id: 19, title: 'مهمة الممحاة السريعة', description: 'امسح خطاً وهمياً في إطار المهمة.', validator: 'quickErase' },
  { id: 20, title: 'مهمة الضغط المزدوج', description: 'انقر مرتين بسرعة داخل إطار المهمة المؤقت.', validator: 'doubleClick' },
  { id: 21, title: 'مهمة التظليل الأفقي', description: 'ظلل مساحة صغيرة باللون الرمادي الفاتح.', validator: 'lightShade' },
  { id: 22, title: 'مهمة تحديد المركز', description: 'ضع نقطة مركزية واضحة في منتصف إطار المهمة.', validator: 'centerDot' },
  { id: 23, title: 'مهمة الخط المائل', description: 'ارسم خطاً مائلاً من الزاوية للزاوية في صندوق المهمة.', validator: 'diagonalLine' },
  { id: 24, title: 'مهمة التلوين الجزئي', description: 'لون دائرة صغيرة داخل صندوق المهمة باللون الأحمر.', validator: 'partialColor' },
  { id: 25, title: 'مهمة التبديل السريع', description: 'بدل بين أداة القلم والفرشاة داخل إطار المهمة.', validator: 'toolSwitch' },
  { id: 26, title: 'مهمة النقر المتسلسل', description: 'انقر على 3 أهداف تظهر تباعاً داخل صندوق المهمة.', validator: 'sequentialClick' },
  { id: 27, title: 'مهمة إزالة الظلال', description: 'امسح بقعة رمادية داخل إطار المهمة.', validator: 'removeShadow' },
  { id: 28, title: 'مهمة الخط المنحني', description: 'ارسم قوساً صغيراً في إطار المهمة.', validator: 'smallArc' },
  { id: 29, title: 'مهمة التعبئة السريعة', description: 'املأ ربع مربع المهمة باللون الأزرق.', validator: 'quarterFill' },
  { id: 30, title: 'مهمة تأكيد المهمة', description: 'اضغط زر إنهاء المهمة بعد اكتمال التحقق بنجاح.', validator: 'confirmTask' }
];

export function getRandomTask(exclude: number[] = []): GameTask {
  const available = GAME_TASKS.filter(t => !exclude.includes(t.id));
  return available[Math.floor(Math.random() * available.length)];
}
