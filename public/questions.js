// Single source of truth for the questionnaire (used by the form and the dashboard).
window.LIKERT = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];

window.QUESTIONS = [
  { id: 'q1', type: 'mcq', short: 'Age group',
    text: 'What is your age group?',
    options: ['Below 18', '18–20', '21–23', 'Above 23'] },

  { id: 'q2', type: 'mcq', short: 'Daily time on Reels',
    text: 'On an average day, how much time do you spend watching Instagram Reels?',
    options: ['Less than 30 minutes', '30 minutes to 1 hour', '1 to 2 hours', 'More than 2 hours'] },

  { id: 'q3', type: 'mcq', short: 'When Reels are watched',
    text: 'When do you watch Reels the most?',
    options: ['Morning', 'Afternoon or between classes', 'Evening', 'Late at night'] },

  { id: 'q4', type: 'likert', short: 'Opens Reels while studying',
    text: 'I usually open Reels during or in between my study sessions.' },

  { id: 'q5', type: 'likert', short: 'Hard to stop',
    text: 'Once I start watching Reels, I find it hard to stop when I planned to.' },

  { id: 'q6', type: 'mcq', short: 'Study time before distraction',
    text: 'How long can you usually study before you lose focus or reach for your phone?',
    options: ['Less than 15 minutes', '15 to 30 minutes', '30 to 60 minutes', 'More than an hour'] },

  { id: 'q7', type: 'likert', short: 'Harder to focus after Reels',
    text: 'After a Reels session, it is harder for me to focus on reading or lectures.' },

  { id: 'q8', type: 'likert', short: 'Long content feels boring',
    text: 'Short videos make long lectures or textbook chapters feel boring.' },

  { id: 'q9', type: 'mcq', short: '"Quick" study break length',
    text: 'A "quick" Reels break while studying usually ends up lasting…',
    options: ['Under 5 minutes', '5 to 15 minutes', '15 to 30 minutes', 'More than 30 minutes'] },

  { id: 'q10', type: 'likert', short: 'Attention span got shorter',
    text: 'My attention span has become shorter since I started watching Reels regularly.' }
];
