const keywords = [
  'seven',
  'action',
  'adventure',
  'alien',
  'apocalypse',
  'assassin',
  'battle',
  'biography',
  'comedy',
  'crime',
  'cyberpunk',
  'detective',
  'disaster',
  'drama',
  'fantasy',
  'future',
  'gangster',
  'ghost',
  'hero',
  'horror',
  'invasion',
  'journey',
  'love',
  'mystery',
  'robot',
  'romance',
  'sci-fi',
  'space',
  'spy',
  'survival',
  'suspense',
  'technology',
  'thriller',
  'time travel',
  'vampire',
  'virus',
  'war',
  'witch',
  'zombie',
  'supernatural',
  'villain',
  'revolution',
  'dystopia',
  'military',
  'pandemic',
  'underground',
  'magic',
  'iron man', 
  'spider man'
];

const recentlyReleasedKeywords = [
  'magic',
  'alien',
  'war',
  'detective',
  'ghost',
];

export function getRandomKeyword(): string {
  const index = Math.floor(Math.random() * keywords.length);
  return keywords[index];
}

export function getRecentlyReleasedKeywords(): string {
  const index = Math.floor(Math.random() * recentlyReleasedKeywords.length);
  return recentlyReleasedKeywords[index];
}
