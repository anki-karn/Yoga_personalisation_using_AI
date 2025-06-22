import React, { useState } from 'react';
import { ChevronRight, Play, Sparkles, Heart, Zap, Target, CheckCircle, User, Scale, Loader2, ArrowRight, Calendar } from 'lucide-react';
import { generateYogaRecommendation, YogaRecommendation, UserProfile } from './services/geminiService';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserProfile>({
    experience: '',
    goal: '',
    frequency: '',
    age: '',
    weight: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<YogaRecommendation[]>([]);
  const [currentPlanNumber, setCurrentPlanNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNextSteps, setIsLoadingNextSteps] = useState(false);

  const questions = [
    {
      id: 'experience',
      title: "What's your current yoga experience?",
      icon: <Target className="w-6 h-6" />,
      options: [
        { value: 'beginner', label: 'Beginner', desc: 'New to yoga or just starting out' },
        { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with basic poses' },
        { value: 'advanced', label: 'Advanced', desc: 'Comfortable with complex poses' }
      ]
    },
    {
      id: 'goal',
      title: "What is your primary wellness goal?",
      icon: <Heart className="w-6 h-6" />,
      options: [
        { value: 'weight', label: 'Lose Weight', desc: 'Focus on calorie burning and toning' },
        { value: 'relaxation', label: 'Relaxation', desc: 'Stress relief and mindfulness' },
        { value: 'flexibility', label: 'Flexibility', desc: 'Improve range of motion and mobility' },
        { value: 'strength', label: 'Strength', desc: 'Build muscle and core stability' }
      ]
    },
    {
      id: 'frequency',
      title: "How often do you practice yoga?",
      icon: <Zap className="w-6 h-6" />,
      options: [
        { value: 'never', label: 'Never', desc: 'Complete beginner to practice' },
        { value: '1-2', label: '1–2 times/week', desc: 'Occasional practice' },
        { value: '3-5', label: '3–5 times/week', desc: 'Regular practitioner' },
        { value: 'daily', label: 'Daily', desc: 'Dedicated daily practice' }
      ]
    },
    {
      id: 'age',
      title: "What's your age range?",
      icon: <User className="w-6 h-6" />,
      options: [
        { value: '18-25', label: '18-25', desc: 'Young adult' },
        { value: '26-35', label: '26-35', desc: 'Early career' },
        { value: '36-45', label: '36-45', desc: 'Mid-life' },
        { value: '46-55', label: '46-55', desc: 'Mature adult' },
        { value: '55+', label: '55+', desc: 'Senior' }
      ]
    },
    {
      id: 'weight',
      title: "What's your current fitness level?",
      icon: <Scale className="w-6 h-6" />,
      options: [
        { value: 'underweight', label: 'Underweight', desc: 'Looking to build strength' },
        { value: 'normal', label: 'Normal Weight', desc: 'Maintaining current fitness' },
        { value: 'overweight', label: 'Overweight', desc: 'Looking to lose weight' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say', desc: 'Focus on general wellness' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleGetPlan = async () => {
    setIsLoading(true);
    try {
      const rec = await generateYogaRecommendation(answers, 1);
      setRecommendations([rec]);
      setCurrentPlanNumber(1);
      setShowResults(true);
    } catch (error) {
      console.error('Error generating plan:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextSteps = async () => {
    setIsLoadingNextSteps(true);
    try {
      const nextPlanNumber = currentPlanNumber + 1;
      const rec = await generateYogaRecommendation(answers, nextPlanNumber);
      setRecommendations([...recommendations, rec]);
      setCurrentPlanNumber(nextPlanNumber);
    } catch (error) {
      console.error('Error generating next steps:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoadingNextSteps(false);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({ experience: '', goal: '', frequency: '', age: '', weight: '' });
    setShowResults(false);
    setRecommendations([]);
    setCurrentPlanNumber(1);
  };

  const currentQuestion = questions[currentStep];
  const isComplete = Object.values(answers).every(answer => answer !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sand-50 font-poppins">
      {/* Hero Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-sage-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sage-400 to-lavender-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-sage-800">YogaFlow</h1>
            </div>
            {showResults && (
              <button
                onClick={resetQuiz}
                className="text-sage-600 hover:text-sage-800 transition-colors font-medium"
              >
                Take Quiz Again
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!showResults ? (
          <>
            {/* Introduction */}
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-sage-800 mb-4">
                Find Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-lavender-600"> 5-Week Yoga Journey</span>
              </h2>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                Answer a few quick questions and we'll create a personalized 5-week yoga program powered by AI
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= currentStep ? 'bg-sage-500' : 'bg-sage-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-sage-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-sage-500 to-lavender-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Quiz Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-slide-up">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-sage-400 to-lavender-400 rounded-full flex items-center justify-center">
                  {currentQuestion.icon}
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-sage-800 text-center mb-8">
                {currentQuestion.title}
              </h3>

              <div className="grid gap-4 max-w-2xl mx-auto">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-lg ${
                      answers[currentQuestion.id as keyof UserProfile] === option.value
                        ? 'border-sage-500 bg-sage-50 shadow-lg'
                        : 'border-sage-200 hover:border-sage-300 bg-white hover:bg-sage-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sage-800 text-lg mb-1">
                          {option.label}
                        </h4>
                        <p className="text-sage-600 text-sm">
                          {option.desc}
                        </p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-sage-400 group-hover:text-sage-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Get Plan Button */}
              {isComplete && (
                <div className="mt-12 text-center animate-fade-in">
                  <button
                    onClick={handleGetPlan}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-sage-500 to-lavender-500 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating Your Plan...
                      </>
                    ) : (
                      'See My 5-Week Yoga Journey'
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Results Section */
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
                Your Personalized Yoga Journey
              </h2>
              <p className="text-lg text-sage-600">
                Follow this AI-generated progressive path designed specifically for your goals and practice frequency
              </p>
            </div>

            {recommendations.map((recommendation, planIndex) => (
              <div key={planIndex} className="mb-12">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center bg-gradient-to-r from-sage-500 to-lavender-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                    Plan {recommendation.planNumber || planIndex + 1} of Your Journey
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-sage-800 mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-lavender-600">
                      {recommendation.style}
                    </span>
                  </h3>
                  <p className="text-lg text-sage-700 leading-relaxed max-w-3xl mx-auto">
                    {recommendation.reason}
                  </p>
                </div>

                {/* Weekly Plans */}
                <div className="space-y-6 mb-8">
                  {recommendation.weeklyPlans.map((week, index) => (
                    <div key={week.week} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-sage-400 to-lavender-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{week.week}</span>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h4 className="text-xl font-bold text-sage-800 mb-2 md:mb-0">
                              {week.title}
                            </h4>
                            <span className="text-sm font-medium text-lavender-600 bg-lavender-50 px-3 py-1 rounded-full">
                              {week.videoLinks.length} sessions this week
                            </span>
                          </div>
                          
                          <p className="text-sage-700 mb-4 leading-relaxed">
                            {week.description}
                          </p>

                          {/* Focus Areas */}
                          <div className="mb-4">
                            <h5 className="font-semibold text-sage-800 mb-2">Focus Areas:</h5>
                            <div className="flex flex-wrap gap-2">
                              {week.focusAreas.map((area, areaIndex) => (
                                <span key={areaIndex} className="bg-sand-100 text-sage-700 px-3 py-1 rounded-full text-sm">
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Poses */}
                          <div className="mb-4">
                            <h5 className="font-semibold text-sage-800 mb-2">Key Poses:</h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {week.poses.map((pose, poseIndex) => (
                                <span key={poseIndex} className="bg-sage-50 text-sage-700 px-2 py-1 rounded text-sm">
                                  {pose}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Video Links */}
                          <div className="bg-sage-50 rounded-xl p-4 mb-4">
                            <h5 className="font-semibold text-sage-800 mb-3 flex items-center">
                              <Play className="w-4 h-4 mr-2" />
                              Your Practice Videos ({week.videoLinks.length} sessions):
                            </h5>
                            <div className="space-y-3">
                              {week.videoLinks.map((video, videoIndex) => (
                                <div key={videoIndex} className="flex items-center justify-between bg-white rounded-lg p-3">
                                  <div className="flex-1">
                                    {video.dayOfWeek && (
                                      <div className="flex items-center mb-1">
                                        <Calendar className="w-3 h-3 mr-1 text-sage-500" />
                                        <span className="text-xs font-medium text-sage-600">{video.dayOfWeek}</span>
                                      </div>
                                    )}
                                    <a
                                      href={video.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-lavender-600 hover:text-lavender-700 font-medium underline decoration-2 underline-offset-4 hover:decoration-lavender-700 transition-all text-sm"
                                    >
                                      {video.title}
                                    </a>
                                    <div className="flex items-center mt-1 text-xs text-sage-500">
                                      <span>{video.duration}</span>
                                      <span className="mx-2">•</span>
                                      <span>{video.focus.join(', ')}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-sand-50 rounded-xl p-4">
                            <h5 className="font-semibold text-sage-800 mb-2 flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Weekly Tips:
                            </h5>
                            <ul className="space-y-1">
                              {week.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sage-700 text-sm flex items-center">
                                  <span className="w-1.5 h-1.5 bg-sage-400 rounded-full mr-2 flex-shrink-0"></span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Recommendations */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Yogawear Suggestions */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h4 className="font-bold text-sage-800 mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Recommended Yogawear:
                    </h4>
                    <ul className="space-y-2">
                      {recommendation.wearSuggestions.map((suggestion, index) => (
                        <li key={index} className="text-sage-700 flex items-center">
                          <span className="w-2 h-2 bg-sage-400 rounded-full mr-3 flex-shrink-0"></span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Tips */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h4 className="font-bold text-sage-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Success Tips:
                    </h4>
                    <ul className="space-y-2">
                      {recommendation.additionalTips.map((tip, index) => (
                        <li key={index} className="text-sage-700 flex items-center">
                          <span className="w-2 h-2 bg-lavender-400 rounded-full mr-3 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Next Steps Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleNextSteps}
                disabled={isLoadingNextSteps}
                className="bg-gradient-to-r from-lavender-500 to-sage-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mx-auto"
              >
                {isLoadingNextSteps ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Next 5 Weeks...
                  </>
                ) : (
                  <>
                    Next Steps - Get Another 5 Weeks
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-sage-500 to-lavender-500 rounded-2xl p-8 text-center text-white">
              <h4 className="text-2xl font-bold mb-4">Ready to Begin Your Yoga Journey?</h4>
              <p className="text-sage-100 mb-6 text-lg">
                Start with your first 5-week plan and progress at your own pace. Each plan builds upon the previous one for continuous growth.
              </p>
              <button
                onClick={resetQuiz}
                className="bg-white text-sage-700 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Create Another Journey
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-sage-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-sage-400 to-lavender-400 rounded-full flex items-center justify-center mr-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">YogaFlow</span>
          </div>
          <p className="text-sage-300">
            AI-powered personalized yoga journeys for your wellness goals
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;