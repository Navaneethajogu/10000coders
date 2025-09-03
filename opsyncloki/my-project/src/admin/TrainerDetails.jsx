import React from 'react';
import { ArrowLeft, Mail, Phone, Calendar, Award, Users, BookOpen } from 'lucide-react';

const TrainerDetails = ({ cardId, cardData, onBack, trainers = [], trainees = [], batches = [] }) => {
  const allDomains = {
    "java": "Java Developers",
    "python": "Python Developers",
    "web_developer": "Web Developers",
    "testing": "Testing",
    "devops": "DevOps",
    "powerbi": "Power BI"
  };

  const getDetailsContent = () => {
    switch (cardId) {
      case 'total-members':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Members Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{trainers.length + trainees.length}</p>
                  <p className="text-sm text-gray-600">Total Members</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{trainers.filter(t => t.status === 'Active').length + trainees.filter(t => t.status === 'Active').length}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{trainers.filter(t => t.status === 'On Leave').length + trainees.filter(t => t.status === 'On Leave').length}</p>
                  <p className="text-sm text-gray-600">On Leave</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-lg">Members in Java Developers</h4>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {Object.keys(allDomains).map(domain => {
                  const domainTrainers = trainers.filter(t => t.domain === domain);
                  const domainTrainees = trainees.filter(t => t.domain === domain);
                  const members = [...domainTrainers, ...domainTrainees];
                  return members.length > 0 ? (
                    <div key={domain} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                      <h5 className="font-semibold text-gray-900 mb-2">{allDomains[domain]}</h5>
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">({member.role || "Unknown"})</span>
                            <span className={`text-xs text-gray-500 ${member.email === 'kowshika500@gmail.com' ? 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded' : ''}`}>
                              {member.email || "Not provided"}
                            </span>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {member.status || "Unknown"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>);

      case 'total-trainees':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-green-800 mb-4">Trainee Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{trainees.length}</p>
                  <p className="text-sm text-gray-600">Total Trainees</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{trainees.filter(t => t.status === 'Active').length}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{trainees.filter(t => t.status === 'Completed').length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{trainees.filter(t => t.status === 'Dropped').length}</p>
                  <p className="text-sm text-gray-600">Dropped</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Batch Distribution</h4>
              <div className="space-y-3">
                {Object.keys(allDomains).map((domain, index) => {
                  const count = trainees.filter(t => t.domain === domain).length;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${getDomainColor(domain)}`}></div>
                        <span className="text-sm font-medium text-gray-900">{allDomains[domain]}</span>
                      </div>
                      <span className="text-sm text-gray-600">{count} trainees</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'active-batches':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Active Batches Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{batches.length}</p>
                  <p className="text-sm text-gray-600">Active Batches</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{trainees.length}</p>
                  <p className="text-sm text-gray-600">Total Trainees</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{trainers.length}</p>
                  <p className="text-sm text-gray-600">Assigned Trainers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 20 + 70)}%</p>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Batch Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batches.map((batch, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <h5 className="font-semibold text-gray-900 mb-2">{batch.batchname || batch.domain}</h5>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Students: {trainees.filter(t => t.batchId === batch.id).length} | Trainer: {trainers.find(t => t.id === batch.trainer)?.email || 'Not assigned'}</p>
                      <p>Started: {batch.startDate || 'Not provided'}</p>
                      <div className="flex items-center space-x-2">
                        <span>Progress:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${batch.progress || 0}%` }}
                          />
                        </div>
                        <span className="font-medium">{batch.progress || 0}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'attendance-rate':
        return (
          <div className="space-y-6">
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">Attendance Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{Math.floor(Math.random() * 5 + 90)}%</p>
                  <p className="text-sm text-gray-600">Overall Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{trainees.filter(t => t.attendance === 'Present').length}</p>
                  <p className="text-sm text-gray-600">Present Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{trainees.filter(t => t.attendance === 'Absent').length}</p>
                  <p className="text-sm text-gray-600">Absent Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{trainees.filter(t => t.attendance === 'Late').length}</p>
                  <p className="text-sm text-gray-600">Late Arrivals</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Batch-wise Attendance</h4>
              <div className="space-y-4">
                {batches.map((batch, index) => {
                  const batchTrainees = trainees.filter(t => t.batchId === batch.id);
                  const present = batchTrainees.filter(t => t.attendance === 'Present').length;
                  const total = batchTrainees.length;
                  const rate = total > 0 ? Math.round((present / total) * 100) : 0;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{batch.batchname || batch.domain}</p>
                        <p className="text-sm text-gray-600">{present}/{total} students present</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${rate >= 95 ? 'text-green-600' : rate >= 90 ? 'text-blue-600' : 'text-orange-600'}`}>
                          {rate}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'completed-courses':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-indigo-800 mb-4">Course Completion Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{batches.filter(b => b.status === 'Completed').length}</p>
                  <p className="text-sm text-gray-600">Completed Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{trainees.filter(t => t.status === 'Certified').length}</p>
                  <p className="text-sm text-gray-600">Certified Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{Math.floor(Math.random() * 10 + 80)}%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{(Math.random() * 0.5 + 4).toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recently Completed Courses</h4>
              <div className="space-y-4">
                {batches.filter(b => b.status === 'Completed').map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div>
                      <h5 className="font-semibold text-gray-900">{course.batchname || course.domain}</h5>
                      <p className="text-sm text-gray-600">{trainees.filter(t => t.batchId === course.id).length} students • Completed: {course.completionDate || 'Not provided'}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Award size={16} className="text-yellow-500" />
                        <span className="font-medium text-gray-900">{course.rating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'upcoming-assessments':
        return (
          <div className="space-y-6">
            <div className="bg-rose-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-rose-800 mb-4">Assessment Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-rose-600">{batches.filter(b => b.assessmentStatus === 'Upcoming').length}</p>
                  <p className="text-sm text-gray-600">Upcoming Tests</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{trainees.filter(t => t.assessmentStatus === 'Pending').length}</p>
                  <p className="text-sm text-gray-600">Students to Test</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{trainees.filter(t => t.assessmentStatus === 'Completed').length}</p>
                  <p className="text-sm text-gray-600">Completed Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{trainees.filter(t => t.assessmentStatus === 'Pending Review').length}</p>
                  <p className="text-sm text-gray-600">Pending Review</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assessments</h4>
              <div className="space-y-4">
                {batches.filter(b => b.assessmentStatus === 'Upcoming').map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div>
                      <h5 className="font-semibold text-gray-900">{item.assessment || 'Assessment'}</h5>
                      <p className="text-sm text-gray-600">{item.batchname || item.domain} • {trainees.filter(t => t.batchId === item.id).length} students</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{item.assessmentDate || 'Not provided'}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        item.assessmentType === 'Project' ? 'bg-blue-100 text-blue-800' :
                        item.assessmentType === 'Quiz' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.assessmentType || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        if (cardId.includes('-batch')) {
          const domainKey = cardId.replace("-batch", "");
          const domainName = allDomains[domainKey] || domainKey;
          const domainTrainers = trainers.filter(t => t.domain === domainKey) || [];
          const domainTrainees = trainees.filter(t => t.domain === domainKey) || [];

          return (
            <div className="space-y-6">
              <div className={`${cardData.bgColor} p-6 rounded-xl`}>
                <h3 className={`text-xl font-bold ${cardData.textColor} mb-4`}>{domainName} Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${cardData.textColor}`}>{domainTrainees.length}</p>
                    <p className="text-sm text-gray-600">Total Trainees</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${cardData.textColor}`}>{domainTrainers.length}</p>
                    <p className="text-sm text-gray-600">Total Trainers</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-2xl font-bold ${cardData.textColor}`}>{cardData.progress}%</p>
                    <p className="text-sm text-gray-600">Avg Progress</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-lg">Members in {domainName}</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        ...domainTrainers.map(t => ({
                          type: 'Trainer',
                          email: t.email || 'Not provided',
                          domain: domainName
                        })),
                        ...domainTrainees.map(t => ({
                          type: 'Trainee',
                          email: t.email || 'Not provided',
                          domain: domainName
                        }))
                      ].map((member, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{member.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`${member.email === 'kowshika500@gmail.com' ? 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded' : ''}`}>
                              {member.email}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{member.domain}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-lg">Trainers and Assigned Batches in {domainName}</h4>
                <div className="space-y-6">
                  {domainTrainers.map((trainer, trainerIndex) => {
                    const assignedBatches = batches.filter(b => b.domain === domainKey && b.trainer === trainer.id);
                    return (
                      <div key={trainerIndex} className="border border-gray-200 rounded-lg p-4">
                        <h5 className={`text-md font-semibold text-gray-900 mb-2 ${trainer.email === 'kowshika500@gmail.com' ? 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded' : ''}`}>
                          {trainer.email || trainer.username} ({domainName})
                        </h5>
                        <p className="text-sm text-gray-600 mb-3">Assigned Batches: {assignedBatches.length}</p>
                        {assignedBatches.length > 0 ? (
                          <ul className="space-y-2">
                            {assignedBatches.map((batch, batchIndex) => {
                              const numTrainees = trainees.filter(t => t.batchId === batch.id).length;
                              return (
                                <li key={batchIndex} className="flex justify-between items-center text-sm text-gray-700">
                                  <span>{batch.batchname} ({batch.start_date} to {batch.end_date})</span>
                                  <span className="font-medium">{numTrainees} Trainees</span>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">No batches assigned</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Module Progress</h4>
                <div className="space-y-4">
                  {[
                    { module: 'Introduction & Basics', progress: 100, status: 'completed' },
                    { module: 'Advanced Concepts', progress: 80, status: 'in-progress' },
                    { module: 'Project Development', progress: 45, status: 'in-progress' },
                    { module: 'Final Assessment', progress: 0, status: 'pending' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{item.module}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${cardData.color}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        return <div>Details for {cardId} will be loaded from backend...</div>;
    }
  };

  const getDomainColor = (domain) => {
    switch (domain.toLowerCase()) {
      case "java": return "bg-orange-500";
      case "python": return "bg-yellow-500";
      case "web_developer": return "bg-purple-500";
      case "testing": return "bg-teal-500";
      case "devops": return "bg-indigo-500";
      case "powerbi": return "bg-pink-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 ${cardData?.bgColor || 'bg-blue-50'} rounded-lg flex items-center justify-center`}>
            {cardData?.icon && <cardData.icon size={20} className={cardData?.textColor || 'text-blue-600'} />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {cardData?.title || 'Details'}
          </h1>
        </div>
      </div>

      {getDetailsContent()}
    </div>
  );
};

export default TrainerDetails;