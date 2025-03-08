export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-6" />

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Basic Info Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-8">
                {[1, 2].map((section) => (
                  <div key={section} className="space-y-4">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                    {[1, 2, 3].map((skill) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-2 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Assessments Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                {[1, 2].map((assessment) => (
                  <div
                    key={assessment}
                    className="p-4 bg-gray-50 rounded-lg space-y-3"
                  >
                    <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Fit Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-4">
                <div className="h-12 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3].map((score) => (
                    <div
                      key={score}
                      className="h-24 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural Values Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((value) => (
                  <div
                    key={value}
                    className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Resume Summary Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-2">
                {[1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 