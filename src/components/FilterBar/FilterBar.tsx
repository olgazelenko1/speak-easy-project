import { type FC } from "react";
import css from "./FilterBar.module.css";

interface Props {
  filters: {
    languages: string;
    levels: string;
    price_per_hour: number;
  };
  onChange: (filters: Props["filters"]) => void;
}
const FilterBar: FC<Props> = ({ filters, onChange }) => {
  return (
    <div className={css.filterBar}>
      <div className={css.filterContainer}>
        <p>Languages</p>
        <select
          className={css.select}
          value={filters.languages}
          onChange={(e) => onChange({ ...filters, languages: e.target.value })}
        >
          <option value="All">All Languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Russian">Russian</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>

      <div className={css.filterContainer}>
        <p>Levels</p>
        <select
          className={css.select}
          value={filters.levels}
          onChange={(e) => onChange({ ...filters, levels: e.target.value })}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div className={css.filterContainer}>
        <p>Price per hour</p>
        <input
          className={css.input}
          type="number"
          placeholder="Max price / hour"
          value={filters.price_per_hour}
          onChange={(e) =>
            onChange({
              ...filters,
              price_per_hour: parseFloat(e.target.value) || 0,
            })
          }
        />
      </div>
    </div>
  );
};
export default FilterBar;
