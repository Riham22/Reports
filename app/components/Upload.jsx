// "use client";
// import { useState } from "react";

// const CommitmentsTable = ({ onCommitmentsChange }) => {
//   const c1 = (
//     <p>
//       إقرار شركة تقديم الخدمة بتنفيذ الاتي: -١التعاقد مع مكتب استشاري هندسي
//       معتمد في مجال الوقاية والحماية من الحريق لأعداد وتصميم مخططات السلامة
//       وتقديم التقارير الفنية على أن تشمل مدى مطابقة معدات السلامة للمواصفات
//       المعتمدة وإصدار شهادات المطابقة إنهاء الأعمال وذلك وفق ما ورد بكود البناء
//       السعودي وحسب ما تضمنه دليل الشروط الوقائية في المشاعر المقدسة لعام ١٤٤٤هـ
//       الصادر من المديرية العامة للدفاع المدني والتأكد من سلامة مرافق الحملة من
//       الناحية الإنشائية والصحية والكهربائية ومتابعة توفر جاهزية اشتراطات
//       ومتطلبات الحماية والوقاية من الحريق أنظمة الإنذار أنظمة الإطفاء مخارج
//       ومسالك الهروب . الخ(. -٢التأكد من وجود شهادات تركيب معدات الوقاية والحماية
//       من الحريق من قبل جهات معتمدة في هذا المجال وفقاً لما نصت عليه لائحة تنظيم
//       ممارسة الأنشطة الهندسية والفنية. -٣تفعيل العمل بلائحة مسؤوليات المختص
//       بأعمال السلامة والأمن الصناعي في الوزارات والمصالح الحكومية والجهات ذات
//       الشخصية المعنوية العامة والمؤسسات وتدريب العاملين بالحملة على استخدام
//       تجهيزات السلامة المتوفرة من خلال أحد معاهد التدريب المعتمدة لدى المؤسسة
//       العامة للتدريب التقني والمهني -٤حساب الطاقة الاستيعابية وفقاً لما ورد بكود
//       البناء السعودي على ألا يتجاوز الإشغال الفعلي الطاقة الاستيعابية المحدد في
//       تقرير المكتب الهندسي المعتمد في مجال الوقاية والحماية من الحريق القائم
//       بالدراسة. -٥حصر كافة المخاطر المتوقع حدوثها والعمل على تقييمها وتحليلها
//       وأعداد خطط الطوارئ والإخلاء الخاصة بها لتخفيف آثارها والحد من وقوعها لا
//       سمح الله{" "}
//     </p>
//   );
//   const c2 = (
//     <p>
//       تعهد بمنع حيازة واستخدام الغازات البترولية المسالة اتعهد بعدم تداول أو
//       تخزين الغازات البترولية المسالة أيا كان شكلها أو حجمها أو الغرض من
//       استخدامها وذلك في أي موقع تابع لي ضمن الحدود الجغرافية للمشاعر المقدسة
//       خلال فترة المنع المقررة. وأعتبر نفسي مسئولا مسئولية كاملة أمام السلطات عن
//       تطبيق هذا المنع واذا ظهر خلاف ذلك أكون عرضة للجزاء الصادر بحقي من قبل
//       الدفاع المدني... وعلى ذلك أوقع.{" "}
//     </p>
//   );
//   const c3 = (
//     <p>
//       إقرار تنفيذ الاعمال الكهربائية بأنه تم تنفيذ كافة التمديدات الكهربائية وفق
//       الأصول الفنية المعتمدة على ضوء ماورد بكود البناء السعودي ووفق ما ورد بدليل
//       الشروط الوقائية بالمشاعر المقدسة الصادر عن المديرية العامة للدفاع المدني
//       كما تتعهد بعدم إيصال التيار الكهربائي إلا بعد موافقة المكتب الهندسي
//       الاستشاري المعتمد في مجال الوقاية والحماية من الحريق والدفاع المدني.
//       واتحمل كامل المسئولية الناتجة عن أي خلل أو قصور في الأعمال الكهربائية التي
//       أقوم بتنفيذها.{" "}
//     </p>
//   );

//   const [commitments, setCommitments] = useState([
//     { description: c1, file: null, isChecked: false },
//     { description: c2, file: null, isChecked: false },
//     { description: c3, file: null, isChecked: false },
//   ]);

//   const handleFileChange = (index, event) => {
//     const newCommitments = [...commitments];
//     newCommitments[index].file = event.target.files[0];
//     setCommitments(newCommitments);
//     onCommitmentsChange(newCommitments);
//   };

//   const handleCheckboxChange = (index) => {
//     const newCommitments = [...commitments];
//     newCommitments[index].isChecked = !newCommitments[index].isChecked;
//     setCommitments(newCommitments);
//     onCommitmentsChange(newCommitments);
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       commitments.forEach((commitment, index) => {
//         if (commitment.isChecked) {
//           formData.append(
//             `commitments[${index}][description]`,
//             commitment.description
//           );
//           formData.append(`commitments[${index}][file]`, commitment.file);
//         }
//       });

//       const response = await fetch("/api/commitment", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert("Commitments saved successfully!");
//       } else {
//         throw new Error(result.error || "Failed to save commitments");
//       }
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-6 rounded-lg">
//       <table className="min-w-full bg-white bg-opacity-50 text-black text-right">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">التأكيد</th>
//             <th className="px-4 py-2 border">التعهد</th>
//             <th className="px-4 py-2 border">إرفاق ملف</th>
//           </tr>
//         </thead>
//         <tbody>
//           {commitments.map((commitment, index) => (
//             <tr key={index}>
//               <td className="px-4 py-2 border text-right">
//                 <input
//                   type="checkbox"
//                   checked={commitment.isChecked}
//                   onChange={() => handleCheckboxChange(index)}
//                 />
//               </td>
//               <td className="px-4 py-2 border text-right">
//                 {commitment.description}
//               </td>
//               <td className="px-4 py-2 border">
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(index, e)}
//                   disabled={!commitment.isChecked}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 text-white rounded"
//       >
//         تأكيد الاقرار
//       </button>
//     </div>
//   );
// };

// export default CommitmentsTable;
