import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("period", { ascending: false });
      if (!error) setExperiences(data || []);
      setLoading(false);
    }
    fetchExperience();
  }, []);

  if (loading) return <p className="text-gray-400">Loading experience...</p>;
  if (experiences.length === 0) return <p className="text-gray-400">No experience data available.</p>;

  return (
    <section id="experience" className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-white">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => {
          let skillArr = [];
          if (typeof exp.skills === "string") {
            try { skillArr = JSON.parse(exp.skills); } catch {}
          } else if (Array.isArray(exp.skills)) {
            skillArr = exp.skills;
          }
          return (
            <div
              key={exp.id || idx}
              className="bg-white/5 border border-white/10 rounded-lg p-6 shadow transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col md:flex-row gap-6"
            >
              {/* IMAGE SECTION */}
              {exp.image && (
                <img
                  src={exp.image}
                  alt={exp.company + " logo"}
                  className="w-72 h-72 object-contain rounded-lg bg-white/10 mb-4 md:mb-0"
                />
              )}

              {/* TEXT/CONTENT SECTION */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-purple-300">{exp.role}</h3>
                    <p className="text-lg font-medium text-gray-200">
                      {exp.company} <span className="text-sm text-gray-400">({exp.location})</span>
                    </p>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                    {skillArr.map((skill, sidx) => (
                      <span key={sidx} className="bg-purple-700/20 text-purple-200 px-3 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mt-3">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}