
import { Feature } from "@/types/feature";

interface FeatureListProps {
  features: Feature[];
  selectedFeature: string;
  onSelectFeature: (featureId: string) => void;
}

const FeatureList = ({ features, selectedFeature, onSelectFeature }: FeatureListProps) => {
  return (
    <div className="w-full md:w-1/3 border-r border-green-200 dark:border-green-800">
      <ul className="divide-y divide-green-100 dark:divide-green-900">
        {features.map((feature) => (
          <li key={feature.id}>
            <button
              onClick={() => onSelectFeature(feature.id)}
              className={`w-full text-left p-4 hover:bg-green-50 dark:hover:bg-green-950 transition-colors ${
                selectedFeature === feature.id ? 'bg-green-50 dark:bg-green-950 border-l-4 border-green-500' : ''
              }`}
            >
              <h3 className="font-medium text-green-800 dark:text-green-300">{feature.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{feature.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList;
