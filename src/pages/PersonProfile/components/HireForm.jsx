import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function HireForm({ person, hiredPeople, setHiredPeople, id }) {
  const [wage, setWage] = useState(0);
  const navigate = useNavigate();

  const updateHiredPeople = (newPersonData) => {
    setHiredPeople(prev => [...prev, newPersonData]);
  };

  // Handle form submission
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      
      const hiredPersonIndex = hiredPeople.findIndex(p => p.id.name === id);
      
      if (hiredPersonIndex !== -1) {
        const updatedHiredPeople = [...hiredPeople];
        updatedHiredPeople[hiredPersonIndex].wage = Number(wage);
        setHiredPeople(updatedHiredPeople);
      } else {
        const newHire = {
          name: {
            first: person.name.first,
            last: person.name.last,
          },
          id: {
            name: person.id.name,
          },
          wage: Number(wage),
        };
        updateHiredPeople(newHire);
      }

      // Navigate back
      navigate(-1);
    },
    [hiredPeople, id, person, wage, setHiredPeople, navigate]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="wage">Wage Offer</label>
      <input
        type="number"
        id="wage"
        name="wage"
        onChange={(e) => setWage(e.target.value)}
        value={wage}
        min="0"
      />
      <button type="submit">Hire</button>
    </form>
  );
}

export default HireForm;
