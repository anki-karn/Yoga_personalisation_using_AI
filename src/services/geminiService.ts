import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface UserProfile {
  experience: string;
  goal: string;
  frequency: string;
  age: string;
  weight: string;
}

export interface VideoLink {
  title: string;
  url: string;
  duration: string;
  focus: string[];
  dayOfWeek?: string;
}

export interface WeeklyPlan {
  week: number;
  title: string;
  description: string;
  duration: string;
  focusAreas: string[];
  videoLinks: VideoLink[];
  tips: string[];
  poses: string[];
}

export interface YogaRecommendation {
  style: string;
  reason: string;
  weeklyPlans: WeeklyPlan[];
  wearSuggestions: string[];
  additionalTips: string[];
  planNumber?: number;
}

// Comprehensive video database organized by experience level and focus
const YOGA_VIDEO_DATABASE = {
  beginner: {
    foundation: [
      { title: "Yoga For Complete Beginners - 20 Minute Home Yoga Workout", url: "https://www.youtube.com/watch?v=v7AYKMP6rOE", duration: "20 minutes", focus: ["foundation", "breathing", "basic poses"] },
      { title: "Gentle Morning Yoga - 15 Minutes", url: "https://www.youtube.com/watch?v=VaoV1PrYft4", duration: "15 minutes", focus: ["morning", "gentle", "flexibility"] },
      { title: "Yoga Basics - Breath and Body", url: "https://www.youtube.com/watch?v=4pKly2JojMw", duration: "25 minutes", focus: ["breathing", "alignment", "basics"] }
    ],
    strength: [
      { title: "Beginner Yoga Flow - 25 Minutes", url: "https://www.youtube.com/watch?v=4pKly2JojMw", duration: "25 minutes", focus: ["flow", "strength", "balance"] },
      { title: "Yoga For Beginners - 30 Minute Fat Burning", url: "https://www.youtube.com/watch?v=UEEsdXn8oG8", duration: "30 minutes", focus: ["weight loss", "fat burning", "strength"] },
      { title: "Core Strength Yoga for Beginners", url: "https://www.youtube.com/watch?v=pLT3KqBxb5s", duration: "20 minutes", focus: ["core", "strength", "abs"] }
    ],
    flexibility: [
      { title: "Deep Stretch Yoga - 20 Minutes", url: "https://www.youtube.com/watch?v=yT7T73-QBEM", duration: "20 minutes", focus: ["flexibility", "stretching", "mobility"] },
      { title: "Hip Opening Yoga for Beginners", url: "https://www.youtube.com/watch?v=02AOdKcXqw0", duration: "25 minutes", focus: ["hip opening", "flexibility", "lower body"] },
      { title: "Gentle Stretch and Flow", url: "https://www.youtube.com/watch?v=8T_bE5I2gow", duration: "18 minutes", focus: ["gentle", "stretching", "relaxation"] }
    ],
    relaxation: [
      { title: "Bedtime Yoga - 20 Minute Practice", url: "https://www.youtube.com/watch?v=BiWnaZ2nph0", duration: "20 minutes", focus: ["relaxation", "sleep", "stress relief"] },
      { title: "Yin Yoga for Deep Relaxation", url: "https://www.youtube.com/watch?v=8T_bE5I2gow", duration: "30 minutes", focus: ["yin", "relaxation", "deep stretch"] },
      { title: "Restorative Yoga Flow", url: "https://www.youtube.com/watch?v=GLy2rYHwUqY", duration: "25 minutes", focus: ["restorative", "calm", "meditation"] }
    ]
  },
  intermediate: {
    foundation: [
      { title: "30 Minute Vinyasa Flow - Intermediate", url: "https://www.youtube.com/watch?v=GLy2rYHwUqY", duration: "30 minutes", focus: ["vinyasa", "flow", "strength"] },
      { title: "Power Yoga 30 Minute Workout", url: "https://www.youtube.com/watch?v=Nz5xJE0FCCU", duration: "30 minutes", focus: ["power", "strength", "cardio"] },
      { title: "Intermediate Flow Practice", url: "https://www.youtube.com/watch?v=j7rKKpwdXNE", duration: "28 minutes", focus: ["intermediate", "flow", "balance"] }
    ],
    strength: [
      { title: "Power Yoga Advanced - 25 Minutes", url: "https://www.youtube.com/watch?v=TXU591OYOHA", duration: "25 minutes", focus: ["power", "advanced", "strength"] },
      { title: "Core Power Yoga - 20 Minutes", url: "https://www.youtube.com/watch?v=pLT3KqBxb5s", duration: "20 minutes", focus: ["core", "strength", "abs"] },
      { title: "Strong Vinyasa Flow", url: "https://www.youtube.com/watch?v=Nz5xJE0FCCU", duration: "30 minutes", focus: ["strength", "vinyasa", "challenging"] }
    ],
    flexibility: [
      { title: "Yoga For Flexibility - 25 Minute Deep Stretch", url: "https://www.youtube.com/watch?v=yT7T73-QBEM", duration: "25 minutes", focus: ["flexibility", "stretching", "mobility"] },
      { title: "Hip Opening Flow - Intermediate", url: "https://www.youtube.com/watch?v=02AOdKcXqw0", duration: "30 minutes", focus: ["hip opening", "flexibility", "intermediate"] },
      { title: "Full Body Stretch Flow", url: "https://www.youtube.com/watch?v=8T_bE5I2gow", duration: "27 minutes", focus: ["full body", "stretching", "flexibility"] }
    ],
    relaxation: [
      { title: "Yin Yoga for Deep Relaxation - 30 Minutes", url: "https://www.youtube.com/watch?v=8T_bE5I2gow", duration: "30 minutes", focus: ["yin", "relaxation", "deep stretch"] },
      { title: "Evening Wind Down Flow", url: "https://www.youtube.com/watch?v=BiWnaZ2nph0", duration: "25 minutes", focus: ["evening", "relaxation", "stress relief"] },
      { title: "Meditation and Movement", url: "https://www.youtube.com/watch?v=GLy2rYHwUqY", duration: "22 minutes", focus: ["meditation", "mindful", "calm"] }
    ]
  },
  advanced: {
    foundation: [
      { title: "Advanced Vinyasa Flow - 30 Minutes", url: "https://www.youtube.com/watch?v=j7rKKpwdXNE", duration: "30 minutes", focus: ["advanced", "vinyasa", "challenging"] },
      { title: "Power Yoga Advanced - 25 Minutes", url: "https://www.youtube.com/watch?v=TXU591OYOHA", duration: "25 minutes", focus: ["power", "advanced", "strength"] },
      { title: "Dynamic Flow Practice", url: "https://www.youtube.com/watch?v=Nz5xJE0FCCU", duration: "32 minutes", focus: ["dynamic", "advanced", "flow"] }
    ],
    strength: [
      { title: "Advanced Arm Balances - 20 Minutes", url: "https://www.youtube.com/watch?v=kInpfOwjbEY", duration: "20 minutes", focus: ["arm balances", "advanced", "strength"] },
      { title: "Power Flow Challenge", url: "https://www.youtube.com/watch?v=TXU591OYOHA", duration: "28 minutes", focus: ["power", "challenging", "strength"] },
      { title: "Advanced Core and Strength", url: "https://www.youtube.com/watch?v=pLT3KqBxb5s", duration: "25 minutes", focus: ["core", "advanced", "strength"] }
    ],
    flexibility: [
      { title: "Advanced Hip Opening Flow - 30 Minutes", url: "https://www.youtube.com/watch?v=02AOdKcXqw0", duration: "30 minutes", focus: ["hip opening", "flexibility", "advanced"] },
      { title: "Advanced Backbend Practice - 25 Minutes", url: "https://www.youtube.com/watch?v=YQampHRGKrI", duration: "25 minutes", focus: ["backbends", "advanced", "heart opening"] },
      { title: "Deep Flexibility Flow", url: "https://www.youtube.com/watch?v=yT7T73-QBEM", duration: "30 minutes", focus: ["flexibility", "deep stretch", "advanced"] }
    ],
    relaxation: [
      { title: "Advanced Yin Practice", url: "https://www.youtube.com/watch?v=8T_bE5I2gow", duration: "35 minutes", focus: ["yin", "advanced", "deep relaxation"] },
      { title: "Meditation and Advanced Breathwork", url: "https://www.youtube.com/watch?v=GLy2rYHwUqY", duration: "30 minutes", focus: ["meditation", "breathwork", "advanced"] },
      { title: "Restorative Advanced Practice", url: "https://www.youtube.com/watch?v=BiWnaZ2nph0", duration: "28 minutes", focus: ["restorative", "advanced", "healing"] }
    ]
  }
};

function getVideosPerWeek(frequency: string): number {
  switch (frequency.toLowerCase()) {
    case 'never':
      return 1; // 1 video per week for complete beginners
    case '1-2':
      return 2; // 2 videos per week for occasional practice
    case '3-5':
      return 4; // 4 videos per week for regular practitioners
    case 'daily':
      return 7; // 7 videos per week for daily practitioners
    default:
      return 2;
  }
}

function getDaysOfWeek(frequency: string): string[] {
  switch (frequency.toLowerCase()) {
    case 'never':
      return ['Sunday']; // One gentle session per week
    case '1-2':
      return ['Wednesday', 'Sunday']; // Mid-week and weekend
    case '3-5':
      return ['Monday', 'Wednesday', 'Friday', 'Sunday']; // Every other day
    case 'daily':
      return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    default:
      return ['Wednesday', 'Sunday'];
  }
}

function selectVideosForWeek(
  experience: string, 
  goal: string, 
  frequency: string, 
  week: number
): VideoLink[] {
  const experienceLevel = experience.toLowerCase() as keyof typeof YOGA_VIDEO_DATABASE;
  const videosPerWeek = getVideosPerWeek(frequency);
  const daysOfWeek = getDaysOfWeek(frequency);
  
  const videoDatabase = YOGA_VIDEO_DATABASE[experienceLevel] || YOGA_VIDEO_DATABASE.beginner;
  
  // Determine focus areas based on goal and week progression
  let focusAreas: (keyof typeof videoDatabase)[] = [];
  
  if (goal === 'weight') {
    focusAreas = ['strength', 'foundation', 'flexibility'];
  } else if (goal === 'relaxation') {
    focusAreas = ['relaxation', 'flexibility', 'foundation'];
  } else if (goal === 'flexibility') {
    focusAreas = ['flexibility', 'foundation', 'relaxation'];
  } else if (goal === 'strength') {
    focusAreas = ['strength', 'foundation', 'flexibility'];
  } else {
    focusAreas = ['foundation', 'strength', 'flexibility', 'relaxation'];
  }
  
  const selectedVideos: VideoLink[] = [];
  
  // Select videos based on frequency and progression
  for (let i = 0; i < videosPerWeek; i++) {
    const focusIndex = i % focusAreas.length;
    const focusArea = focusAreas[focusIndex];
    const availableVideos = videoDatabase[focusArea] || videoDatabase.foundation;
    
    // Select video based on week progression
    const videoIndex = Math.min(week - 1, availableVideos.length - 1);
    const baseVideo = availableVideos[videoIndex] || availableVideos[0];
    
    // Add day of week if we have enough days
    const dayOfWeek = i < daysOfWeek.length ? daysOfWeek[i] : undefined;
    
    selectedVideos.push({
      ...baseVideo,
      dayOfWeek
    });
  }
  
  return selectedVideos;
}

export async function generateYogaRecommendation(userProfile: UserProfile, planNumber: number = 1): Promise<YogaRecommendation> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const planContext = planNumber === 1 
      ? "This is the user's first 5-week yoga plan. Start with foundational practices."
      : `This is the user's ${planNumber === 2 ? 'second' : planNumber === 3 ? 'third' : `${planNumber}th`} 5-week yoga plan. Build upon their previous experience and introduce more advanced techniques and variations.`;

    const videosPerWeek = getVideosPerWeek(userProfile.frequency);
    const practiceSchedule = getDaysOfWeek(userProfile.frequency);

    const prompt = `
    You are a professional yoga instructor creating a personalized 5-week yoga program. Based on the user profile below, create a comprehensive weekly progression plan.

    ${planContext}

    User Profile:
    - Experience Level: ${userProfile.experience}
    - Primary Goal: ${userProfile.goal}
    - Practice Frequency: ${userProfile.frequency} (${videosPerWeek} sessions per week)
    - Age: ${userProfile.age}
    - Weight Category: ${userProfile.weight}

    Practice Schedule: ${practiceSchedule.join(', ')}

    Please provide a response in the following JSON format (respond ONLY with valid JSON, no additional text):

    {
      "style": "Recommended yoga style name",
      "reason": "Brief explanation why this style fits the user and their ${videosPerWeek} sessions per week schedule (2-3 sentences)",
      "weeklyPlans": [
        {
          "week": 1,
          "title": "Week 1 title",
          "description": "What the user will focus on this week with ${videosPerWeek} sessions (2-3 sentences)",
          "duration": "Recommended session duration (15-30 minutes)",
          "focusAreas": ["area1", "area2", "area3"],
          "tips": ["tip1", "tip2", "tip3"],
          "poses": ["pose1", "pose2", "pose3", "pose4", "pose5"]
        }
        // ... repeat for weeks 2-5
      ],
      "wearSuggestions": ["suggestion1", "suggestion2", "suggestion3"],
      "additionalTips": ["tip1 for ${videosPerWeek} sessions per week", "tip2", "tip3"]
    }

    IMPORTANT GUIDELINES:
    - Create a progressive 5-week plan that builds in difficulty
    - Consider the user practices ${videosPerWeek} times per week on ${practiceSchedule.join(', ')}
    - Adjust intensity and expectations based on practice frequency
    - Focus on the primary goal while maintaining safety
    - Include 3-5 specific yoga poses for each week
    - Provide practical tips for each week that account for their practice schedule
    - Suggest appropriate yogawear based on the goal and user profile
    - Keep descriptions concise but informative
    - If this is plan ${planNumber}, make it appropriately challenging for someone who has completed ${planNumber - 1} previous 5-week programs
    - Account for rest and recovery needs based on practice frequency
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    let parsedResponse;
    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      parsedResponse = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      throw new Error('Invalid response format from AI service');
    }

    // Add appropriate video links to each week based on frequency
    const enhancedWeeklyPlans = parsedResponse.weeklyPlans.map((week: any, index: number) => {
      const videoLinks = selectVideosForWeek(userProfile.experience, userProfile.goal, userProfile.frequency, index + 1);
      return {
        ...week,
        videoLinks
      };
    });

    return {
      ...parsedResponse,
      weeklyPlans: enhancedWeeklyPlans,
      planNumber
    };

  } catch (error) {
    console.error('Error generating yoga recommendation:', error);
    
    // Enhanced fallback recommendation based on plan number and frequency
    const isAdvancedPlan = planNumber > 1;
    const baseIntensity = isAdvancedPlan ? 'Intermediate' : 'Beginner';
    const videosPerWeek = getVideosPerWeek(userProfile.frequency);
    
    const fallbackWeeklyPlans = Array.from({ length: 5 }, (_, weekIndex) => {
      const videoLinks = selectVideosForWeek(userProfile.experience, userProfile.goal, userProfile.frequency, weekIndex + 1);
      
      return {
        week: weekIndex + 1,
        title: `Week ${weekIndex + 1} - ${isAdvancedPlan ? 'Advanced' : 'Foundation'} Practice`,
        description: `Focus on building your practice with ${videosPerWeek} sessions this week, progressing at your own pace.`,
        duration: isAdvancedPlan ? '25-35 minutes' : '15-25 minutes',
        focusAreas: isAdvancedPlan ? ['Advanced poses', 'Flow mastery', 'Strength building'] : ['Basic poses', 'Breathing', 'Alignment'],
        videoLinks,
        tips: [
          `Practice ${videosPerWeek} times this week as scheduled`,
          'Listen to your body and rest when needed',
          'Focus on consistent practice over perfection'
        ],
        poses: isAdvancedPlan 
          ? ['Advanced Sun Salutation', 'Warrior III', 'Side Plank', 'Crow Pose', 'Wheel Pose']
          : ['Mountain Pose', 'Child\'s Pose', 'Cat-Cow', 'Downward Dog', 'Standing Forward Fold']
      };
    });
    
    return {
      style: isAdvancedPlan ? 'Progressive Vinyasa Flow' : 'Balanced Hatha Yoga',
      reason: `Perfect for your ${videosPerWeek} sessions per week schedule. ${isAdvancedPlan 
        ? 'Building on your previous practice with more dynamic flows and challenging poses.'
        : 'A gentle, well-rounded approach that fits your practice frequency and builds sustainable habits.'}`,
      weeklyPlans: fallbackWeeklyPlans,
      wearSuggestions: isAdvancedPlan 
        ? ['High-performance yoga leggings', 'Moisture-wicking top', 'Grip-enhanced yoga mat', 'Yoga towel for intense sessions']
        : ['Comfortable yoga leggings', 'Breathable top', 'Non-slip yoga mat', 'Yoga blocks for support'],
      additionalTips: [
        `Stick to your ${videosPerWeek} sessions per week schedule`,
        'Track your progress and celebrate small wins',
        'Stay hydrated and listen to your body',
        'Focus on consistency over intensity'
      ],
      planNumber
    };
  }
}