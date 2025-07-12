export const fetchExperience = async () => {
  const response = await fetch('/data/experience.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export const fetchPortfolio = async () => {
  const response = await fetch('/data/portfolio.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
} 

export const fetchSkills = async () => {
  const response = await fetch('/data/skills.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
} 

export const fetchSocials = async () => {
  const response = await fetch('/data/socials.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();  
}