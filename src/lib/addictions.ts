export interface Addiction {
	id: string;
	name: string;
	emoji: string;
	color: string;
	treatment: string;
}

export const predefinedAddictions: Addiction[] = [
	{
		id: 'social_media',
		name: 'Social Media',
		emoji: '📱',
		color: 'bg-blue-900/50 text-blue-300',
		treatment: `## Breaking Social Media Addiction
### Understanding the Cycle
Social media platforms are designed to be addictive through variable reward schedules and infinite scroll. Each notification triggers dopamine release, creating a habit loop.
### Evidence-Based Strategies
**1. Digital Detox (Gradual)**
- Start with 1-hour phone-free periods
- Gradually extend to half-day breaks
- Use grayscale mode to reduce visual appeal
**2. Environment Design**
- Remove apps from home screen
- Disable all non-essential notifications
- Use website blockers during focus time
**3. Replacement Activities**
- Physical exercise (releases dopamine naturally)
- Reading physical books
- Face-to-face social interaction
**4. Mindfulness Practice**
- Notice urges without acting (10-minute rule)
- Practice RAIN: Recognize, Allow, Investigate, Non-identify
- Journal about triggers and emotions
### Recovery Timeline
- Week 1-2: Intense cravings, anxiety
- Week 3-4: Cravings reduce, boredom increases
- Month 2-3: New habits form, mental clarity improves
- Month 6+: Sustainable lifestyle change
### Professional Help
Consider therapy if:
- Unable to reduce usage despite negative consequences
- Experiencing severe anxiety or depression
- Social media use interferes with work/relationships`
	},
	{
		id: 'gaming',
		name: 'Gaming',
		emoji: '🎮',
		color: 'bg-purple-900/50 text-purple-300',
		treatment: `## Overcoming Gaming Addiction
### Recognition
Gaming becomes problematic when it interferes with sleep, work, relationships, or physical health. Key signs include loss of interest in other activities and continued play despite negative consequences.
### Treatment Approaches
**1. Structured Gaming Schedule**
- Set specific gaming windows (e.g., 1 hour after dinner)
- Use timers and stick to limits
- No gaming before completing daily responsibilities
**2. Identify Psychological Needs**
Gaming often fulfills needs for:
- Achievement → Seek real-world goals
- Social connection → Join clubs or groups
- Escape → Address underlying stress/anxiety
**3. Physical Health Recovery**
- Re-establish sleep schedule (no screens 2h before bed)
- Regular exercise to restore dopamine balance
- Proper nutrition and hydration
**4. Social Reconnection**
- Schedule regular in-person meetups
- Join hobby groups or sports teams
- Volunteer work for sense of purpose
### Harm Reduction (If Complete Abstinence Is Difficult)
- Switch to games with natural endpoints
- Avoid games with loot boxes or pay-to-win mechanics
- Play only with real-life friends (time-limited sessions)
### When to Seek Help
- Gaming 30+ hours/week
- Neglecting hygiene or health
- Job loss or academic failure
- Relationship breakdown`
	},
	{
		id: 'pornography',
		name: 'Pornography',
		emoji: '🚫',
		color: 'bg-red-900/50 text-red-300',
		treatment: `## Recovery from Pornography Addiction
### Understanding the Impact
Pornography can rewire the brain's reward system, leading to escalating tolerance, relationship problems, and diminished real-world intimacy.
### Recovery Strategies
**1. Complete Digital Environment Change**
- Install accountability software (Covenant Eyes, Qustodio)
- Move devices out of bedroom
- Never use internet alone during vulnerable times
- Use DNS-level filtering (CleanBrowsing, OpenDNS)
**2. Neuroplasticity Reset (90-Day Reboot)**
- Abstain from all pornography and masturbation
- Brain begins rewiring dopamine pathways
- Expect withdrawal: anxiety, mood swings, insomnia
- "Flatline" period (weeks 2-6): low libido is normal
**3. Urge Surfing Technique**
- Urges peak at 15-20 minutes then subside
- Physical activity during urges (push-ups, cold shower)
- "HALT" check: Hungry, Angry, Lonely, Tired?
- Call accountability partner
**4. Address Root Causes**
- Stress/anxiety → Meditation, therapy
- Loneliness → Build genuine connections
- Boredom → Develop engaging hobbies
- Trauma → Professional counseling
**5. Relationship Repair**
- Honest disclosure with partner (consider therapist present)
- Couples counseling if in relationship
- Learn healthy intimacy patterns
### Support Resources
- NoFap community (with caution - avoid extremes)
- SAA (Sex Addicts Anonymous) meetings
- CSAT-certified therapist (Certified Sex Addiction Therapist)
### Long-Term Maintenance
- Continue accountability relationships
- Regular exercise and sleep hygiene
- Meditation practice (reduces impulsivity)
- Serve others (builds meaning and connection)`
	},
	{
		id: 'alcohol',
		name: 'Alcohol',
		emoji: '🍺',
		color: 'bg-amber-900/50 text-amber-300',
		treatment: `## Alcohol Use Disorder Treatment
### Medical Consideration
**⚠️ IMPORTANT**: Alcohol withdrawal can be life-threatening. Consult a doctor before stopping if you drink heavily daily.
### Professional Treatment Options
**1. Medical Detox (Heavy Use)**
- Supervised withdrawal (prevents seizures)
- Medications: Benzodiazepines for withdrawal
- 3-7 day inpatient stay typical
**2. Medication-Assisted Treatment**
- Naltrexone: Reduces cravings and reward from drinking
- Acamprosate: Reduces post-acute withdrawal symptoms
- Disulfiram: Makes drinking physically unpleasant
**3. Therapy Approaches**
- CBT: Identify triggers, develop coping strategies
- Motivational Enhancement: Build commitment to change
- 12-Step facilitation: AA meeting integration
### Self-Management Strategies
**1. Avoid High-Risk Situations**
- No alcohol at home
- Avoid bars and drinking friends initially
- Plan non-drinking activities for weekends
**2. Build New Routines**
- Replace drinking time with exercise
- Hobby development (music, art, sports)
- Regular sleep schedule
**3. Manage Triggers**
- Stress → Meditation, therapy
- Social pressure → "I'm not drinking tonight" script
- Boredom → Structured schedule
**4. Support Network**
- AA meetings (or SMART Recovery for non-12-step)
- Sober friends or sponsor
- Family involvement
### Warning Signs for Professional Help
- Unable to stop after starting
- Drinking alone or in morning
- Blackouts or memory loss
- Work/relationship problems
- Physical dependence (shakes, sweats without alcohol)
### Recovery Timeline
- Week 1: Acute withdrawal (medical supervision if needed)
- Month 1: Sleep improves, mood stabilizes
- Month 3: Mental clarity returns
- Year 1: Brain healing continues
- Ongoing: Relapse risk decreases but never zero`
	},
	{
		id: 'nicotine',
		name: 'Nicotine/Vaping',
		emoji: '🚬',
		color: 'bg-gray-700 text-gray-300',
		treatment: `## Nicotine Cessation
### Quit Methods
**1. Cold Turkey (25% success rate)**
- Immediate cessation
- Most uncomfortable but fastest
- Best for light smokers (<10/day)
**2. Nicotine Replacement Therapy (50% success rate)**
- Patches, gum, lozenges
- Reduces withdrawal symptoms
- Gradual taper over 8-12 weeks
**3. Prescription Medications**
- Varenicline (Chantix): Blocks nicotine receptors (most effective)
- Bupropion (Zyban): Antidepressant that reduces cravings
- Doubles quit success rate
**4. Behavioral Therapy**
- Identify smoking triggers
- Develop alternative coping strategies
- Group or individual counseling
### Managing Withdrawal (Peaks day 3-5)
- Cravings last 3-5 minutes each
- Physical: Irritability, difficulty concentrating, increased appetite
- Use "4 D's": Delay, Deep breathing, Drink water, Do something else
### Environmental Changes
- Remove all smoking materials
- Avoid smoking triggers (coffee, alcohol, smoking friends)
- Change routines associated with smoking
- Clean house/car to remove smoke smell
### Long-Term Success Strategies
- Exercise (reduces cravings and weight gain)
- Healthy snacks for oral fixation
- Celebrate milestones
- Save money in visible jar
### Timeline of Benefits
- 20 minutes: Heart rate normalizes
- 24 hours: Heart attack risk decreases
- 2 weeks: Circulation and lung function improve
- 1 year: Heart disease risk cut in half
- 10 years: Lung cancer risk cut in half
### Relapse Prevention
- One cigarette can restart addiction
- High-risk situations: Stress, alcohol, smoking friends
- Have emergency plan (call someone, chew gum, exercise)`
	},
	{
		id: 'cannabis',
		name: 'Cannabis',
		emoji: '🌿',
		color: 'bg-green-900/50 text-green-300',
		treatment: `## Cannabis Use Disorder Recovery
### Recognition
While often considered "non-addictive," regular cannabis use can lead to psychological dependence, withdrawal symptoms, and life interference.
### Withdrawal Symptoms (Peaks week 1-2)
- Irritability and mood swings
- Sleep disturbances and vivid dreams
- Decreased appetite
- Anxiety and restlessness
- Cravings
### Evidence-Based Treatment
**1. Cognitive Behavioral Therapy (CBT)**
- Most effective approach for cannabis dependence
- Identify triggers and high-risk situations
- Develop coping strategies
- 12-16 sessions typical
**2. Contingency Management**
- Reward system for clean drug tests
- Effective for maintaining abstinence
- Often combined with CBT
**3. Motivational Enhancement Therapy**
- Build internal motivation to quit
- Explore ambivalence about use
- 2-4 sessions to jumpstart change
### Self-Help Strategies
**1. Environment Control**
- Remove all paraphernalia
- Avoid friends who use (at least initially)
- Delete dealer contacts
- Change routines associated with use
**2. Manage Common Triggers**
- Boredom: Schedule engaging activities
- Stress: Exercise, meditation, therapy
- Sleep issues: Sleep hygiene, melatonin temporarily
- Socializing: Find new sober activities
**3. Address What Cannabis Was Masking**
- Anxiety → Therapy, mindfulness
- Insomnia → Sleep hygiene, CBT-I
- Lack of motivation → Goal setting, accountability
- Social anxiety → Social skills training, gradual exposure
### Support Resources
- Marijuana Anonymous (MA)
- SMART Recovery
- Individual therapy
- Group therapy
### Physical Health Recovery
- Exercise to restore natural dopamine
- Healthy diet (appetite returns in 1-2 weeks)
- Sleep schedule (may take 1-2 months to normalize)
- Hydration and avoiding caffeine
### Long-Term Outlook
- Week 1-2: Worst withdrawal symptoms
- Week 3-4: Mood and sleep improve
- Month 2-3: Mental clarity returns
- Month 6+: Dreams normalize, brain function improves
### Harm Reduction (If Abstinence Not Ready)
- Reduce frequency (e.g., weekends only)
- Avoid use before noon
- Don't drive while impaired
- Address any underlying mental health issues`
	},
	{
		id: 'shopping',
		name: 'Shopping/Spending',
		emoji: '💳',
		color: 'bg-pink-900/50 text-pink-300',
		treatment: `## Compulsive Shopping Treatment
### Understanding Compulsive Buying
Often linked to depression, anxiety, or low self-esteem. Provides temporary emotional relief but leads to guilt, debt, and relationship problems.
### Immediate Actions
**1. Financial Barriers**
- Freeze credit cards (literally, in ice)
- Remove saved payment info from websites
- Set up purchase delay (24-hour rule for non-essentials)
- Use cash-only system
**2. Environmental Changes**
- Unsubscribe from marketing emails
- Block shopping websites
- Delete shopping apps
- Avoid malls and stores
### Psychological Treatment
**1. Cognitive Behavioral Therapy (CBT)**
- Identify emotional triggers
- Challenge thoughts driving purchases
- Develop alternative coping strategies
- Most effective treatment
**2. Address Underlying Issues**
- Depression → Antidepressants, therapy
- Anxiety → Relaxation techniques, exposure therapy
- Low self-esteem → Self-compassion work
- Trauma → Trauma-focused therapy
**3. Mindfulness Practice**
- Notice urge without acting
- "STOP" technique: Stop, Take breath, Observe, Proceed mindfully
- Urge surfing (cravings peak and subside)
### Behavioral Strategies
**1. The 30-Day List**
- Write down desired purchases
- Revisit after 30 days
- Most items no longer desired
**2. One-In-One-Out Rule**
- For each new item, donate one existing item
- Reduces accumulation
- Makes purchases more meaningful
**3. Hobby Replacement**
- Free or low-cost hobbies
- Creative pursuits
- Social activities
**4. Gratitude Practice**
- Daily gratitude journal
- Appreciate current possessions
- Reduces "need" for more
### Financial Recovery
**1. Face the Damage**
- List all debts
- Calculate total owed
- Create repayment plan
**2. Budget System**
- Track every expense
- Envelope system for categories
- Automate savings
**3. Accountability**
- Share spending with partner/friend
- Consider financial counselor
- Debtors Anonymous meetings
### Long-Term Maintenance
- Regular therapy or support groups
- Continue environmental barriers
- Develop identity beyond possessions
- Cultivate experiences over things
### Support Resources
- Debtors Anonymous
- Financial Peace University
- NFCC (National Foundation for Credit Counseling)
- Individual therapy (CBT or ACT)`
	},
	{
		id: 'food',
		name: 'Food/Binge Eating',
		emoji: '🍔',
		color: 'bg-orange-900/50 text-orange-300',
		treatment: `## Binge Eating Disorder Treatment
### Medical Note
⚠️ Eating disorders can be life-threatening. Consult healthcare provider for proper diagnosis and treatment plan.
### Professional Treatment (Recommended)
**1. Cognitive Behavioral Therapy (CBT-E)**
- Enhanced CBT for eating disorders
- Most evidence-based approach
- 20 sessions over 20 weeks typical
- Addresses thoughts, behaviors, emotions
**2. Dialectical Behavior Therapy (DBT)**
- Emotion regulation skills
- Distress tolerance
- Mindfulness eating
- Particularly effective for emotional eating
**3. Interpersonal Therapy (IPT)**
- Addresses relationship issues triggering eating
- 12-16 sessions
- Good alternative to CBT
**4. Medication**
- Vyvanse (lisdexamfetamine): FDA-approved for BED
- Antidepressants for co-occurring depression/anxiety
- Must combine with therapy
### Self-Help Strategies
**1. Regular Eating Pattern**
- Three meals + 2-3 snacks daily
- Never skip meals (triggers binges)
- Eat every 3-4 hours
- No "good" or "bad" foods mentality
**2. Mindful Eating**
- Eat without distractions (no phone, TV)
- Eat slowly, chew thoroughly
- Notice hunger and fullness cues
- Pause halfway through meal
**3. Emotion Regulation**
- Identify emotions triggering binges
- Alternative coping: journaling, exercise, calling friend
- "HALT" check: Hungry, Angry, Lonely, Tired?
- Emotion surfing (feelings peak and pass)
**4. Environmental Management**
- Keep trigger foods out of house initially
- Meal prep to reduce decisions
- Eat at table, not standing
- Create peaceful eating environment
### Addressing Common Triggers
**1. Restriction/Dieting**
- Stop dieting (major binge trigger)
- All foods allowed in moderation
- Focus on nutrition, not weight loss
- Intuitive eating principles
**2. Stress**
- Develop stress management toolkit
- Exercise, meditation, therapy
- Time management
- Saying "no" to overcommitment
**3. Boredom**
- Structured schedule
- Engaging hobbies
- Social activities
- Volunteer work
**4. Negative Body Image**
- Body neutrality over body love
- Unfollow triggering social media
- Wear comfortable clothes
- Self-compassion practice
### Recovery Challenges
**1. Lapse vs. Relapse**
- One binge ≠ failure
- Analyze trigger without judgment
- Return to plan immediately
- Learn from experience
**2. All-or-Nothing Thinking**
- Progress isn't linear
- Small improvements matter
- Self-compassion crucial
- Focus on process, not outcome
### Support Resources
- NEDA (National Eating Disorders Association) Hotline
- Overeaters Anonymous
- ANAD (Anorexia Nervosa and Associated Disorders)
- Individual therapy with eating disorder specialist
### Long-Term Recovery
- Maintain regular eating
- Continue therapy/support
- Practice self-compassion
- Address perfectionism
- Develop identity beyond body/food`
	}
];

export const getUserAddictions = (): string[] => {
	if (typeof localStorage === 'undefined') return [];
	const stored = localStorage.getItem('user-addictions');
	return stored ? JSON.parse(stored) : [];
};

export const setUserAddictions = (addictions: string[]): void => {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('user-addictions', JSON.stringify(addictions));
};

export const addUserAddiction = (customName: string): void => {
	const current = getUserAddictions();
	if (!current.includes(customName)) {
		setUserAddictions([...current, customName]);
	}
};
