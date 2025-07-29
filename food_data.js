const generalHeuristics = [
  "<strong>Protein Intake (Men):</strong> Strive for approximately 1 gram of protein per pound of your target body weight daily.",
  "<strong>Protein Intake (Women):</strong> Aim for 0.8 to 1 gram of protein per pound of your target body weight daily.",
  "<strong>Hydration:</strong> Drink at least 8-10 glasses of water per day. Increase this amount on days you train.",
  "<strong>Meal Composition:</strong> For main meals, build your plate with a source of protein, fibrous vegetables, and complex carbohydrates.",
  "<strong>Meal Building Formula:</strong> A great meal consists of 1 Palm of Protein + 1-2 Fists of Veggies + 1 Cupped Hand of Carbs + 1 Thumb of Fats."
];

const proteinSources = [
  { name: "Lean Beef, Bison, Elk", portion: "1 Palm-Sized Portion", protein: "25g", fat: "8-12g", calories: "180-220" },
  { name: "Fatty Beef, Pork", portion: "1 Palm-Sized Portion", protein: "22g", fat: "15-20g", calories: "230-280" },
  { name: "Chicken, Turkey Breast", portion: "1 Palm-Sized Portion", protein: "30g", fat: "4g", calories: "165" },
  { name: "Fish (Salmon, Cod)", portion: "1 Palm-Sized Portion", protein: "25g", fat: "10-15g", calories: "200-250" },
  { name: "Large Egg", portion: "1 Egg", protein: "6g", fat: "5g", calories: "75" },
  { name: "Greek Yogurt (Plain)", portion: "1 Cupped Hand", protein: "18g", fat: "0-5g", calories: "120" },
  { name: "Beans (Black, Kidney)", portion: "1 Cupped Hand", protein: "7g", fat: "<1g", calories: "115" }
];

const otherSources = [
  { name: "Rice, Pasta (Cooked)", portion: "1 Cupped Hand", carbs: "25-30g", fat: "<1g", calories: "120-150" },
  { name: "Fresh Bread", portion: "1 Slice", carbs: "15-20g", fat: "1-2g", calories: "80-110" },
  { name: "Fruits (Apple, Banana)", portion: "1 Fist", carbs: "20-25g", fat: "<1g", calories: "90-120" },
  { name: "Vegetables (Broccoli, etc.)", portion: "1 Fist", carbs: "5-10g", fat: "<1g", calories: "30-50" },
  { name: "Lettuce, Leafy Greens", portion: "2 Full Hands", carbs: "<5g", fat: "0g", calories: "<20" },
  { name: "Natural Peanut Butter", portion: "1 Thumb", carbs: "3g", fat: "8g", calories: "100" },
  { name: "Olive Oil, Butter", portion: "1 Thumb", carbs: "0g", fat: "14g", calories: "120" }
];

const disclaimerText = "The information provided in this application is for general informational purposes only. It is not intended as medical advice and should not be used for diagnosis or treatment. Please consult with a qualified healthcare professional or registered dietitian before making any changes to your diet or exercise routine.";