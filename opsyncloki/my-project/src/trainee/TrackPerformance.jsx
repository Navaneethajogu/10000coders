import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Trophy
} from 'lucide-react';

const TrackPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const performanceData = {
    overall: {
      grade: 'A',
      percentage: 87.5,
      rank: 3,
      totalStudents: 28,
      trend: 'up'
    },
    subjects: [
      {
        name: 'Java Fundamentals',
        score: 92,
        maxScore: 100,
        grade: 'A+',
        progress: 95,
        assignments: 8,
        completedAssignments: 8
      },
      {
        name: 'Spring Framework',
        score: 85,
        maxScore: 100,
        grade: 'A',
        progress: 80,
        assignments: 6,
        completedAssignments: 5
      },
      {
        name: 'Database Design',
        score: 88,
        maxScore: 100,
        grade: 'A',
        progress: 90,
        assignments: 5,
        completedAssignments: 5
      },
      {
        name: 'Web Development',
        score: 82,
        maxScore: 100,
        grade: 'B+',
        progress: 75,
        assignments: 7,
        completedAssignments: 6
      }
    ],
    recentScores: [
      { assignment: 'Java Collections Assignment', score: 95, maxScore: 100, date: '2025-01-14' },
      { assignment: 'Spring Boot Project', score: 88, maxScore: 100, date: '2025-01-12' },
      { assignment: 'Database Normalization Quiz', score: 92, maxScore: 50, date: '2025-01-10' },
      { assignment: 'Unit Testing Exercise', score: 85, maxScore: 25, date: '2025-01-08' }
    ],
    achievements: [
      { title: 'Perfect Attendance', description: 'Maintained 100% attendance for 2 weeks', icon: Award, color: 'text-green-600' },
      { title: 'Top Performer', description: 'Scored in top 5 for Java Fundamentals', icon: Trophy, color: 'text-yellow-600' },
      { title: 'Quick Learner', description: 'Completed all assignments on time', icon: Star, color: 'text-blue-600' }
    ],
    weeklyProgress: [
      { week: 'Week 1', score: 78 },
      { week: 'Week 2', score: 82 },
      { week: 'Week 3', score: 85 },
      { week: 'Week 4', score: 87 }
    ]
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return 'text-green-600 bg-green-100';
      case 'A':
        return 'text-blue-600 bg-blue-100';
      case 'B+':
        return 'text-orange-600 bg-orange-100';
      case 'B':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const SubjectCard = ({ subject }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
        <span className={`px-3 py-1 text-sm rounded-full ${getGradeColor(subject.grade)}`}>
          {subject.grade}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Score</span>
          <span className="text-lg font-bold text-gray-900">{subject.score}/{subject.maxScore}</span>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{subject.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
              style={{ width: `${subject.progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Assignments</span>
          <span className="font-medium text-gray-900">
            {subject.completedAssignments}/{subject.assignments} completed
          </span>
        </div>
      </div>
    </div>
  );

  const ScoreCard = ({ score }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900 text-sm">{score.assignment}</h4>
        <span className="text-sm font-bold text-blue-600">{score.score}/{score.maxScore}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{score.date}</span>
        <span className="text-xs font-medium text-green-600">
          {Math.round((score.score / score.maxScore) * 100)}%
        </span>
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center`}>
          <achievement.icon size={20} className={achievement.color} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">{achievement.title}</h4>
          <p className="text-xs text-gray-600">{achievement.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <BarChart3 size={20} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Track Performance</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-gray-400" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Overall Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-purple-600">{performanceData.overall.grade}</span>
            </div>
            <p className="text-sm text-gray-600">Overall Grade</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-600">{performanceData.overall.percentage}%</span>
            </div>
            <p className="text-sm text-gray-600">Average Score</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-green-600">#{performanceData.overall.rank}</span>
            </div>
            <p className="text-sm text-gray-600">Class Rank</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp size={32} className="text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">Trending Up</p>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {performanceData.subjects.map((subject, index) => (
            <SubjectCard key={index} subject={subject} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Scores */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Recent Scores
          </h3>
          <div className="space-y-3">
            {performanceData.recentScores.map((score, index) => (
              <ScoreCard key={index} score={score} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="mr-2 text-yellow-600" size={20} />
            Achievements
          </h3>
          <div className="space-y-3">
            {performanceData.achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="mr-2 text-purple-600" size={20} />
          Weekly Progress
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {performanceData.weeklyProgress.map((week, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <div className="w-full bg-gray-200 rounded-full h-24 flex items-end justify-center">
                  <div 
                    className="bg-gradient-to-t from-purple-500 to-purple-600 rounded-full w-8"
                    style={{ height: `${week.score}%` }}
                  />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{week.week}</p>
              <p className="text-xs text-gray-600">{week.score}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Strengths</span>
            </div>
            <p className="text-sm text-green-700">Excellent performance in Java Fundamentals and consistent assignment submissions.</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Areas to Improve</span>
            </div>
            <p className="text-sm text-yellow-700">Focus more on Web Development concepts and complete pending assignments.</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Next Goals</span>
            </div>
            <p className="text-sm text-blue-700">Aim for A+ grade in Spring Framework and maintain current performance level.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPerformance;