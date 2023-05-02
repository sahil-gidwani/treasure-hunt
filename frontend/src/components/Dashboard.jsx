import React, { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import Plot from "react-plotly.js";

const Dashboard = () => {
  const api = useAxios();
  const [averageHighScore, setAverageHighScore] = useState();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [gender_pie, setGenderPie] = useState();
  const [age_pie, setAgePie] = useState();
  const [bar, setBar] = useState();
  const [scatter, setScatter] = useState();
  const [heatmap, setHeatmap] = useState();

  const getData = async () => {
    try {
      const response = await api.get(`/accounts/dashboard/`);
      setAverageHighScore(parseFloat(response.data.avg_high_score));
      setTotalUsers(parseInt(response.data.total_users));
      setUsers(JSON.parse(response.data.top_users));
      setGenderPie(JSON.parse(response.data.gender_pie_fig));
      setAgePie(JSON.parse(response.data.age_group_pie_fig));
      setBar(JSON.parse(response.data.bar_fig));
      setScatter(JSON.parse(response.data.scatter_fig));
      setHeatmap(JSON.parse(response.data.heatmap_fig));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col mb-12">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
          Admin Dashboard
        </h1>
        <div className="w-20 h-1 bg-blue-500 mt-2"></div>
      </div>

      <div className="flex flex-wrap justify-around mx-auto max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg p-6 m-6">
          <h2 className="text-lg font-medium mb-2">Average High Score</h2>
          <div className="text-4xl font-bold text-green-500">
            {averageHighScore.toFixed(2)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 m-6">
          <h2 className="text-lg font-medium mb-2">Total Users</h2>
          <div className="text-4xl font-bold text-blue-500">{totalUsers}</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center font-bold leading-tight text-gray-900 mb-4">
          User Leaderboard
        </h2>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        High Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.email}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {user.high_score}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto" style={{ width: "70%" }}>
        <Plot
          data={gender_pie?.data}
          layout={gender_pie?.layout}
          useResizeHandler
          style={{ width: "100%" }}
        />
        <Plot
          data={age_pie?.data}
          layout={age_pie?.layout}
          useResizeHandler
          style={{ width: "100%" }}
        />
        <Plot
          data={bar?.data}
          layout={bar?.layout}
          useResizeHandler
          style={{ width: "100%" }}
        />
        <Plot
          data={scatter?.data}
          layout={scatter?.layout}
          useResizeHandler
          style={{ width: "100%" }}
        />
        <Plot
          data={heatmap?.data}
          layout={heatmap?.layout}
          useResizeHandler
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
};

export default Dashboard;
