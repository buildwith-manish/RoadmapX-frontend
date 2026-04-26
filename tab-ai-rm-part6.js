// ═══════════════════════════════════════════════════════════════
// PART 6 OF 6 — ASSEMBLY & INIT
// This is the COMPLETE <script> block for div#tab-ai-rm.
// Replace the placeholder <script> from Part 1 with this entire file.
//
// Assembly order inside the IIFE:
//   1. AI_RM_NODES  (Parts 2 + 3 merged)
//   2. Progress state + save helper
//   3. Expand state
//   4. Rendering engine (Part 4)
//   5. Bottom sheet logic (Part 5)
//   6. aiRmInit() + DOMContentLoaded guard
// ═══════════════════════════════════════════════════════════════

(function () {
'use strict';

// ─────────────────────────────────────────────────────────────
// § 1 — NODE DATA  (Parts 2 + 3 merged into one array)
// ─────────────────────────────────────────────────────────────
const AI_RM_NODES = [

  // ─────────────────────────────────────────────
  // SECTION 1 — PYTHON FOUNDATIONS
  // ─────────────────────────────────────────────
  {
    id: 'python',
    label: 'Python',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'BEGINNER',
    time: '3–4 weeks',
    whyMatters: 'Python is the undisputed lingua franca of AI and machine learning. Every major ML framework — PyTorch, TensorFlow, scikit-learn, Hugging Face — is Python-first. Without solid Python fundamentals, you will constantly battle the language instead of the problem. Employers hiring ML engineers and data scientists almost universally require Python as table stakes before any other skill is considered.',
    learn: [
      'Installing Python 3, setting up a virtual environment, and using pip',
      'Core data types: int, float, str, bool, list, dict, tuple, set',
      'Control flow: if/elif/else, for loops, while loops, list comprehensions',
      'Functions: defining, calling, default args, *args, **kwargs, return values',
      'Object-oriented Python: classes, __init__, methods, inheritance',
      'File I/O: reading and writing text, CSV, and JSON files',
      'Using third-party libraries with pip and requirements.txt'
    ],
    prerequisites: 'None — this is the very first stop',
    task: 'Build a CLI data processor: read a CSV of student scores, compute mean/median/std, write a summary report to a JSON file, and print a sorted leaderboard. Use only the Python standard library — no pandas yet.',
    youtubeQuery: 'Python full course for beginners 2024',
    docsUrl: 'https://docs.python.org/3/tutorial/'
  },
  {
    id: 'py-setup-syntax',
    label: 'Setup & Syntax',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2–3 days',
    whyMatters: 'A properly configured Python environment prevents the dependency hell that breaks most beginners. Virtual environments isolate project dependencies so NumPy 1.x for one project does not clash with NumPy 2.x for another. Python syntax — indentation, colons, f-strings — is unlike most languages, and understanding it early prevents bugs that can take hours to diagnose.',
    learn: [
      'Installing Python 3 via pyenv or the official installer',
      'Creating and activating virtual environments with venv or conda',
      'PEP 8 style guide: indentation, naming conventions, line length',
      'Python REPL and Jupyter notebooks for interactive experimentation',
      'f-strings: f"Hello {name}, you scored {score:.2f}" for clean formatting',
      'Type hints: def process(data: list[float]) -> dict for readable code',
      'Running scripts from the terminal and using __main__ guard'
    ],
    prerequisites: 'None',
    task: 'Set up a Python project from scratch: create a virtual environment, install black and pylint, write a script that passes both linters with zero warnings, and add a requirements.txt. Then format the script using black and verify no style errors remain.',
    youtubeQuery: 'Python virtual environment setup pyenv pip best practices',
    docsUrl: 'https://docs.python.org/3/library/venv.html'
  },
  {
    id: 'py-variables',
    label: 'Variables & Data Types',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2–3 days',
    whyMatters: 'Understanding Python\'s mutable vs immutable types prevents subtle bugs in data pipelines. When you pass a list to a function and it modifies it in-place, that is not a bug — that is Python\'s reference semantics working as designed. Knowing the difference between a list and a tuple, or when to use a set for O(1) membership testing, makes your ML preprocessing code dramatically faster.',
    learn: [
      'Mutable vs immutable: lists are mutable, tuples and strings are not',
      'Python\'s dynamic typing: variables are labels, not typed containers',
      'Numeric types: int (arbitrary precision), float (64-bit IEEE 754), complex',
      'String operations: slicing, .split(), .join(), .strip(), .replace()',
      'List operations: append, extend, pop, slice, list comprehensions',
      'Dictionaries: keys, values, items, dict comprehensions, .get() with defaults',
      'Sets: union, intersection, difference — perfect for deduplication'
    ],
    prerequisites: 'Setup & Syntax',
    task: 'Write a text statistics analyser: read any paragraph, compute word frequency (dict), find the top-10 words (sorted), count unique words (set), and calculate character/word/sentence counts. Handle all edge cases with clean code.',
    youtubeQuery: 'Python data types mutable immutable list dict set tuple',
    docsUrl: 'https://docs.python.org/3/library/stdtypes.html'
  },
  {
    id: 'py-control-flow',
    label: 'Control Flow',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2–3 days',
    whyMatters: 'Control flow is the backbone of every ML data preprocessing pipeline. Filtering bad samples, iterating over batches, and conditionally applying transformations all require fluency in Python\'s loop and conditional constructs. List comprehensions and generator expressions are used throughout NumPy and pandas code, so they must become second nature.',
    learn: [
      'if/elif/else and Python\'s truthy/falsy rules (empty list is falsy)',
      'for loops with enumerate(), zip(), range() and their use cases',
      'while loops and break/continue for early exit patterns',
      'List comprehensions: [f(x) for x in items if condition(x)]',
      'Generator expressions: lazy evaluation saves memory on large datasets',
      'Walrus operator :=  for assignment in conditions (Python 3.8+)',
      'match/case statement (Python 3.10+) for structural pattern matching'
    ],
    prerequisites: 'Variables & Data Types',
    task: 'Without using any library, write a function that takes a list of dicts (student records with name, score, grade) and returns: filtered students above a threshold, grouped by grade using a dict, and the top-3 per group — all using comprehensions and no explicit for loops where avoidable.',
    youtubeQuery: 'Python control flow loops comprehensions generators tutorial',
    docsUrl: 'https://docs.python.org/3/tutorial/controlflow.html'
  },
  {
    id: 'py-functions',
    label: 'Functions & Scope',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'Python\'s functional programming features — map, filter, lambda, closures, decorators — appear constantly in ML codebases. PyTorch\'s nn.Module relies on Python\'s object model. Scikit-learn\'s pipeline uses callable transformers. Understanding closures and decorators lets you write and debug these patterns instead of being confused by them.',
    learn: [
      'Function signatures: positional, keyword, default, *args, **kwargs',
      'LEGB scope rule: Local, Enclosing, Global, Built-in',
      'Closures: inner functions that capture outer variables',
      'Decorators: @functools.wraps, writing your own timing/logging decorators',
      'Lambda functions: anonymous one-liners for map/filter/sorted key arguments',
      'Higher-order functions: map(), filter(), functools.reduce()',
      'Generators with yield: memory-efficient iterators for large data streams'
    ],
    prerequisites: 'Control Flow',
    task: 'Write a decorator @retry(times=3, delay=1.0) that retries a failing function up to N times with a delay between attempts. Then write a @timer decorator that prints execution time. Apply both to a function that randomly fails, and verify behaviour with unit tests.',
    youtubeQuery: 'Python functions decorators closures generators advanced',
    docsUrl: 'https://docs.python.org/3/tutorial/functions.html'
  },
  {
    id: 'py-data-structures',
    label: 'Data Structures',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'Choosing the right data structure determines whether your preprocessing runs in seconds or hours. A defaultdict eliminates defensive .get() patterns. A deque gives O(1) queue operations instead of O(n) list.pop(0). Knowing the time complexity of list vs set membership testing — O(n) vs O(1) — is the difference between a pipeline that scales and one that does not.',
    learn: [
      'Time complexity of common operations: list append O(1), insert O(n), set lookup O(1)',
      'collections.defaultdict for counters and grouping without KeyError',
      'collections.Counter for frequency counting with most_common()',
      'collections.deque for efficient queue and sliding window operations',
      'heapq for priority queues: nlargest, nsmallest, heappush/heappop',
      'OrderedDict and when Python 3.7+ regular dicts are already ordered',
      'namedtuple and dataclasses for clean, typed data containers'
    ],
    prerequisites: 'Control Flow, Functions & Scope',
    task: 'Implement a sliding window word frequency analyser for a text stream: use deque to maintain a window of the last N words, Counter to track frequencies, and heapq to efficiently return the top-K words in the window. Profile the memory usage vs a naive list approach.',
    youtubeQuery: 'Python collections module defaultdict Counter deque tutorial',
    docsUrl: 'https://docs.python.org/3/library/collections.html'
  },
  {
    id: 'py-oop',
    label: 'OOP',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '4 days',
    whyMatters: 'PyTorch\'s entire API is class-based. Every neural network you write is a Python class that inherits from nn.Module. Scikit-learn estimators follow a class interface with fit() and predict(). Understanding inheritance, abstract base classes, and dunder methods is essential for reading and extending ML library code, not just using it at the surface.',
    learn: [
      'Classes, __init__, self, and instance vs class attributes',
      'Inheritance: super().__init__() and method overriding',
      'Dunder methods: __repr__, __str__, __len__, __getitem__, __iter__',
      'Abstract base classes with abc.ABC and @abstractmethod',
      '@property, @setter for controlled attribute access',
      '@classmethod and @staticmethod and their correct use cases',
      'Composition vs inheritance: "has-a" vs "is-a" design decisions'
    ],
    prerequisites: 'Functions & Scope',
    task: 'Build a mini scikit-learn-style estimator: a class LinearNormalizer with fit(X) that computes mean/std, transform(X) that normalises, and fit_transform(X) convenience method. Subclass it for MinMaxNormalizer. Implement __repr__ and a clone() method. Verify with unit tests.',
    youtubeQuery: 'Python OOP object oriented programming classes inheritance tutorial',
    docsUrl: 'https://docs.python.org/3/tutorial/classes.html'
  },
  {
    id: 'py-file-io',
    label: 'File I/O & APIs',
    section: 1,
    sectionTitle: 'Python Foundations',
    isMain: false,
    parent: 'python',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2–3 days',
    whyMatters: 'ML pipelines are fundamentally about moving data: reading CSVs from disk, downloading datasets from APIs, writing processed features back to storage. Understanding Python\'s file handling, the requests library, and JSON serialisation is the glue that connects every other skill. Without it, you cannot load data into your models.',
    learn: [
      'Reading and writing text files with open(), pathlib.Path for OS-independent paths',
      'CSV reading/writing with the csv module and DictReader/DictWriter',
      'JSON: json.load(), json.dump(), handling nested structures',
      'requests library: GET, POST, headers, query params, response parsing',
      'Error handling: try/except for IOError, JSONDecodeError, HTTPError',
      'Environment variables with os.environ and python-dotenv for API keys',
      'Downloading files with requests and streaming large responses in chunks'
    ],
    prerequisites: 'Variables & Data Types',
    task: 'Build a dataset downloader script: fetch data from a public API (e.g. OpenMeteo weather API), parse the JSON response, save to CSV, implement resumable downloads that skip if file exists, and add retry logic with exponential backoff. Use only stdlib + requests.',
    youtubeQuery: 'Python file IO requests API JSON tutorial for data science',
    docsUrl: 'https://docs.python.org/3/tutorial/inputoutput.html'
  },

  // ─────────────────────────────────────────────
  // SECTION 2 — MATHEMATICS FOR AI
  // ─────────────────────────────────────────────
  {
    id: 'math-ai',
    label: 'Math for AI',
    section: 2,
    sectionTitle: 'Mathematics for AI',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'INTERMEDIATE',
    time: '4–6 weeks',
    whyMatters: 'You do not need a PhD in mathematics to do ML — but you do need enough mathematical maturity to read papers, understand what your model is actually doing, and debug when loss does not decrease. Without linear algebra, neural networks are a black box. Without calculus, you cannot understand backpropagation. Without probability, you cannot reason about uncertainty or overfitting.',
    learn: [
      'Vectors, matrices, and the geometric intuition behind them',
      'Eigendecomposition and its role in PCA and dimensionality reduction',
      'Derivatives, partial derivatives, and the chain rule for backpropagation',
      'Probability distributions, Bayes\'s theorem, and maximum likelihood estimation',
      'Cross-entropy loss, KL divergence, and information theory basics',
      'Connecting the maths to NumPy code: every formula has a one-liner',
      'When to study deeper vs when to use the math as a reading aid'
    ],
    prerequisites: 'Python Foundations',
    task: 'Implement PCA from scratch using only NumPy: compute the covariance matrix, find eigenvalues/eigenvectors, project data onto the top-k components, and visualise the explained variance ratio. Compare your result against sklearn.decomposition.PCA.',
    youtubeQuery: 'mathematics for machine learning linear algebra calculus probability',
    docsUrl: 'https://mml-book.github.io/'
  },
  {
    id: 'linear-algebra',
    label: 'Linear Algebra',
    section: 2,
    sectionTitle: 'Mathematics for AI',
    isMain: false,
    parent: 'math-ai',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2–3 weeks',
    whyMatters: 'Every neural network is fundamentally a sequence of matrix multiplications. Understanding matrix shapes, dot products, and broadcasting explains why your model has the number of parameters it does, why certain architectures work, and why batch size affects memory. Eigenvalues explain why some optimisation problems are hard and why certain initialisations prevent vanishing gradients.',
    learn: [
      'Vectors: dot product, cross product, norms (L1, L2, Frobenius)',
      'Matrix multiplication, transpose, and when AB ≠ BA',
      'Systems of linear equations: Ax = b, when solutions exist',
      'Eigenvalues and eigenvectors: Av = λv and geometric meaning',
      'Singular Value Decomposition (SVD): M = UΣVᵀ and its applications',
      'Matrix rank, null space, column space — why they matter for model expressiveness',
      'Broadcasting in NumPy: how (batch, 1, features) × (1, classes, features) works'
    ],
    prerequisites: 'Python Foundations',
    task: 'Implement a recommender system using matrix factorisation: decompose a user-item rating matrix with SVD, reconstruct missing ratings, and recommend top-5 items per user. Visualise user and item embeddings in 2D using the top-2 singular vectors.',
    youtubeQuery: 'linear algebra for machine learning 3blue1brown MIT',
    docsUrl: 'https://numpy.org/doc/stable/reference/routines.linalg.html'
  },
  {
    id: 'calculus-gradients',
    label: 'Calculus & Gradients',
    section: 2,
    sectionTitle: 'Mathematics for AI',
    isMain: false,
    parent: 'math-ai',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1–2 weeks',
    whyMatters: 'Backpropagation — the algorithm that trains every neural network — is an application of the chain rule of calculus. Without understanding derivatives, you cannot reason about why your model is not learning, why learning rates matter, or what gradient clipping is protecting against. The chain rule also appears in every automatic differentiation library including PyTorch\'s autograd.',
    learn: [
      'Derivatives: rate of change, power rule, product rule, chain rule',
      'Partial derivatives: ∂L/∂w for a multi-parameter loss function',
      'Gradient: the vector of all partial derivatives, points in direction of steepest ascent',
      'Gradient descent: θ ← θ − α∇L(θ) and why learning rate α matters',
      'Jacobian and Hessian matrices for vector-valued functions',
      'Computational graphs: how PyTorch traces operations for automatic differentiation',
      'Vanishing and exploding gradients: why they happen and how to diagnose them'
    ],
    prerequisites: 'Linear Algebra',
    task: 'Implement gradient descent from scratch to fit a linear regression model: write the forward pass (predict), the loss function (MSE), manually compute the gradients, and update weights in a loop. Plot the loss curve and compare with analytical solution using numpy.linalg.lstsq.',
    youtubeQuery: 'calculus backpropagation gradient descent explained visually',
    docsUrl: 'https://explained.ai/calculus/'
  },
  {
    id: 'probability-stats',
    label: 'Probability & Statistics',
    section: 2,
    sectionTitle: 'Mathematics for AI',
    isMain: false,
    parent: 'math-ai',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 weeks',
    whyMatters: 'Probability is the language of uncertainty — and ML is fundamentally about reasoning under uncertainty. Overfitting is a statistical problem. Model evaluation requires statistical testing. Gaussian distributions appear in noise models, weight initialisation, and VAEs. Without probability, you cannot interpret a confidence score, explain why regularisation works, or design a meaningful A/B test for your model.',
    learn: [
      'Probability axioms, conditional probability, Bayes\'s theorem: P(A|B) = P(B|A)P(A)/P(B)',
      'Common distributions: Gaussian, Bernoulli, Categorical, Uniform and when each arises',
      'Expected value, variance, covariance, and correlation',
      'Maximum Likelihood Estimation (MLE): choosing parameters that maximise P(data|params)',
      'Frequentist vs Bayesian interpretation of probability',
      'Central Limit Theorem and why it justifies Gaussian noise assumptions',
      'Hypothesis testing, p-values, and confidence intervals for model evaluation'
    ],
    prerequisites: 'Calculus & Gradients',
    task: 'Build a Naive Bayes text classifier from scratch: estimate class priors and likelihoods from a labelled dataset using MLE (with Laplace smoothing), implement the log-probability prediction, and evaluate on a test split. Compare accuracy to sklearn.naive_bayes.MultinomialNB.',
    youtubeQuery: 'probability statistics for machine learning MLE Bayes theorem',
    docsUrl: 'https://www.probabilitycourse.com/'
  },
  {
    id: 'info-theory',
    label: 'Information Theory',
    section: 2,
    sectionTitle: 'Mathematics for AI',
    isMain: false,
    parent: 'math-ai',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Cross-entropy is the most widely used loss function in classification tasks — and it comes directly from information theory. KL divergence powers VAEs and knowledge distillation. Mutual information is used in feature selection and representation learning. If you want to understand why your classification loss formula looks the way it does, information theory is the answer.',
    learn: [
      'Shannon entropy H(X) = -Σ p(x) log p(x) as a measure of uncertainty',
      'Cross-entropy loss: H(p, q) = -Σ p(x) log q(x) and its connection to MLE',
      'KL divergence: D_KL(P||Q) as the cost of approximating P with Q',
      'Mutual information: I(X;Y) measuring statistical dependence between variables',
      'Bits vs nats: logarithm base 2 vs natural log in entropy calculations',
      'Minimum description length and connection to model compression',
      'Why entropy maximisation leads to the Gaussian distribution'
    ],
    prerequisites: 'Probability & Statistics',
    task: 'Implement cross-entropy loss and KL divergence from scratch in NumPy. Show that binary cross-entropy is equivalent to negative log-likelihood for Bernoulli models. Then implement a simple temperature scaling calibration for a classifier and show how it changes the entropy of predictions.',
    youtubeQuery: 'information theory for machine learning cross entropy KL divergence',
    docsUrl: 'https://colah.github.io/posts/2015-09-Visual-Information/'
  },

  // ─────────────────────────────────────────────
  // SECTION 3 — DATA SCIENCE
  // ─────────────────────────────────────────────
  {
    id: 'data-science',
    label: 'Data Science',
    section: 3,
    sectionTitle: 'Data Science',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'BEGINNER',
    time: '3–4 weeks',
    whyMatters: 'Before you can train any model, you need to understand your data. Data scientists spend 60–80% of their time on data wrangling, not modelling. Mastering NumPy, pandas, and visualisation tools transforms raw, messy datasets into clean, informative features. These tools are the foundation of every data-driven job, from analyst to ML engineer.',
    learn: [
      'NumPy arrays: vectorised operations that are 100x faster than Python loops',
      'Pandas DataFrames: the Excel of Python, but for millions of rows',
      'Matplotlib and Seaborn for exploratory data analysis visualisation',
      'EDA workflow: shape, dtypes, missing values, distributions, correlations',
      'Data cleaning: handling nulls, duplicates, outliers, and type errors',
      'Groupby, merge, pivot: reshaping data for analysis and modelling',
      'From raw CSV to a clean, feature-ready dataset'
    ],
    prerequisites: 'Python Foundations, Mathematics for AI',
    task: 'Complete a full EDA and cleaning pipeline on the Titanic dataset: load, explore, identify issues, clean (handle missing ages with median imputation, encode categorical features), and produce a publication-quality report with at least 6 meaningful visualisations.',
    youtubeQuery: 'data science pandas numpy matplotlib EDA pipeline tutorial',
    docsUrl: 'https://pandas.pydata.org/docs/user_guide/index.html'
  },
  {
    id: 'numpy',
    label: 'NumPy',
    section: 3,
    sectionTitle: 'Data Science',
    isMain: false,
    parent: 'data-science',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 week',
    whyMatters: 'NumPy is the bedrock of scientific Python. Every ML framework — pandas, scikit-learn, PyTorch when on CPU — stores data as NumPy arrays under the hood. Vectorised operations in NumPy run at C speed, making them orders of magnitude faster than Python loops. Understanding broadcasting, reshaping, and indexing is essential for writing efficient data preprocessing code.',
    learn: [
      'np.array(), dtype, shape, ndim, size — understanding array structure',
      'Array creation: zeros, ones, arange, linspace, random.randn, random.uniform',
      'Indexing and slicing: [row, col], boolean indexing for filtering',
      'Broadcasting rules: how (3,) + (3,1) = (3,3) works under the hood',
      'Vectorised operations: replacing Python for loops with array arithmetic',
      'Reshaping: reshape(), flatten(), ravel(), expand_dims(), squeeze()',
      'Linear algebra: np.dot, np.matmul (@), np.linalg.inv, np.linalg.eig'
    ],
    prerequisites: 'Python Foundations',
    task: 'Implement k-means clustering from scratch using only NumPy: random centroid initialisation, assignment step (vectorised distance matrix), update step (vectorised mean), convergence check. Benchmark it against a naive Python loop implementation on 100,000 points.',
    youtubeQuery: 'NumPy tutorial for data science broadcasting indexing vectorization',
    docsUrl: 'https://numpy.org/doc/stable/user/absolute_beginners.html'
  },
  {
    id: 'pandas',
    label: 'Pandas',
    section: 3,
    sectionTitle: 'Data Science',
    isMain: false,
    parent: 'data-science',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '2 weeks',
    whyMatters: 'Pandas is the primary tool for real-world data manipulation in Python. Every tabular dataset you encounter — CSV, Excel, SQL query result — flows through pandas. Companies hiring data scientists and ML engineers run pandas in production data pipelines. Fluency in groupby, merge, and window functions makes you productive from day one on any data team.',
    learn: [
      'Series and DataFrame: creating, indexing with .loc and .iloc',
      'Reading data: read_csv, read_json, read_sql with useful parameters (parse_dates, dtype)',
      'Exploring: head(), info(), describe(), value_counts(), nunique()',
      'Filtering: boolean indexing, .query(), .where()',
      'Groupby: split-apply-combine with agg(), transform(), apply()',
      'Merging: pd.merge() with inner/outer/left/right joins on keys',
      'Handling missing data: isna(), fillna(), dropna(), interpolate()'
    ],
    prerequisites: 'NumPy',
    task: 'Analyse 3 years of real NYC taxi trip data (available from the NYC TLC website): load efficiently using chunked reading, clean bad records, compute average tip percentage by hour and borough using groupby, find the busiest pickup locations, and write a summary report to CSV. Handle 10M+ row datasets without running out of memory.',
    youtubeQuery: 'pandas tutorial 2024 data manipulation groupby merge complete',
    docsUrl: 'https://pandas.pydata.org/docs/user_guide/index.html'
  },
  {
    id: 'matplotlib-seaborn',
    label: 'Matplotlib & Seaborn',
    section: 3,
    sectionTitle: 'Data Science',
    isMain: false,
    parent: 'data-science',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 week',
    whyMatters: 'Data visualisation is not optional decoration — it is an analytical tool. Patterns invisible in a table become obvious in a scatter plot. Distributions that look similar by mean and variance can be wildly different when plotted. In every ML project, you will visualise training curves, confusion matrices, feature distributions, and model outputs. Good visualisation is also required for communicating results to non-technical stakeholders.',
    learn: [
      'Matplotlib anatomy: Figure, Axes, subplots(nrows, ncols) for grid layouts',
      'Core plots: line, scatter, bar, histogram, boxplot, heatmap',
      'Seaborn statistical plots: distplot, pairplot, heatmap, violinplot',
      'Customisation: titles, labels, ticks, colormaps, legend placement',
      'Plotly for interactive charts: hover, zoom, export to HTML',
      'Plotting confusion matrices and ROC curves for model evaluation',
      'Matplotlib styles and publication-quality figure export (300 DPI PNG, PDF)'
    ],
    prerequisites: 'Pandas',
    task: 'Build a complete EDA dashboard for the Iris dataset: distribution plots for each feature, pairplot coloured by species, correlation heatmap, boxplots comparing species, and a 2D PCA scatter plot. Export as a multi-page PDF report with plt.savefig. Add interactivity using Plotly for the PCA plot.',
    youtubeQuery: 'matplotlib seaborn plotly data visualisation tutorial Python',
    docsUrl: 'https://matplotlib.org/stable/tutorials/index.html'
  },
  {
    id: 'eda',
    label: 'Exploratory Data Analysis',
    section: 3,
    sectionTitle: 'Data Science',
    isMain: false,
    parent: 'data-science',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'EDA is the systematic process of understanding a dataset before modelling. Skipping it leads to models trained on leaky features, driven by outliers, or biased by unbalanced classes. The best Kaggle competitors and data scientists spend more time on EDA than on model selection. Understanding your data is the highest-return-per-hour activity in the entire ML pipeline.',
    learn: [
      'Univariate analysis: distribution shape, skewness, kurtosis, outlier detection',
      'Bivariate analysis: correlation, scatter plots, point-biserial correlation',
      'Target leakage detection: features correlated with the target for the wrong reason',
      'Class imbalance: identifying and quantifying, SMOTE and undersampling strategies',
      'Feature-target relationship exploration with partial dependence plots',
      'Automated EDA with ydata-profiling (formerly pandas-profiling)',
      'EDA for time series: seasonality, trends, autocorrelation plots'
    ],
    prerequisites: 'Pandas, Matplotlib & Seaborn',
    task: 'Run a complete EDA on the House Prices dataset from Kaggle: detect and handle outliers, identify skewed features that need log transformation, find multicollinear features (correlation > 0.9), detect missing value patterns, and write a 500-word EDA report summarising the 5 most important findings.',
    youtubeQuery: 'exploratory data analysis EDA tutorial Python pandas complete guide',
    docsUrl: 'https://pandas.pydata.org/pandas-docs/stable/user_guide/visualization.html'
  },
  {
    id: 'data-cleaning',
    label: 'Data Cleaning',
    section: 3,
    sectionTitle: 'Data Science',
    isMain: false,
    parent: 'data-science',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: '"Garbage in, garbage out" is the most universal law of machine learning. Clean data improves model performance more reliably than algorithm choice. The difference between a 70% and 85% accurate model is usually in the cleaning step. Real-world datasets are always messy — duplicates, inconsistent formatting, wrong data types, missing values — and cleaning them is a core professional skill.',
    learn: [
      'Missing data mechanisms: MCAR, MAR, MNAR and their implications',
      'Imputation strategies: mean/median/mode, KNN imputation, model-based imputation',
      'Outlier detection and treatment: IQR method, Z-score, isolation forest',
      'Deduplication: finding near-duplicates with fuzzy matching',
      'Type coercion: fixing strings stored as numbers, dates as strings',
      'Encoding categorical variables: ordinal encoding, one-hot encoding, target encoding',
      'Feature scaling: StandardScaler, MinMaxScaler, RobustScaler and when to use each'
    ],
    prerequisites: 'EDA',
    task: 'Take a real messy dataset (the Ames Housing dataset is ideal) and write a complete cleaning pipeline using sklearn Pipeline with custom transformers: handle missing values with different strategies per column, detect and cap outliers, encode categoricals, scale numerics. The pipeline must be reusable on unseen test data without data leakage.',
    youtubeQuery: 'data cleaning Python pandas sklearn pipeline preprocessing tutorial',
    docsUrl: 'https://scikit-learn.org/stable/modules/preprocessing.html'
  },

  // ─────────────────────────────────────────────
  // SECTION 4 — MACHINE LEARNING
  // ─────────────────────────────────────────────
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'INTERMEDIATE',
    time: '6–8 weeks',
    whyMatters: 'Classical machine learning — regression, trees, SVMs, clustering — is not obsolete in the age of deep learning. For tabular data (the majority of real business data), XGBoost and LightGBM routinely outperform neural networks. Understanding the core concepts — bias-variance tradeoff, regularisation, cross-validation — is required background for every ML practitioner regardless of specialisation.',
    learn: [
      'The bias-variance tradeoff and how it guides model selection',
      'Supervised vs unsupervised vs semi-supervised learning',
      'Scikit-learn API: fit(), predict(), transform() on every estimator',
      'Model evaluation: train/val/test splits, cross-validation, metric selection',
      'Regularisation: L1 (Lasso), L2 (Ridge), dropout — the same idea in different forms',
      'Feature engineering: the craft of creating informative inputs from raw data',
      'Gradient boosting: the best algorithm for most tabular ML tasks'
    ],
    prerequisites: 'Data Science, Mathematics for AI',
    task: 'Build a complete ML pipeline for a Kaggle tabular competition: EDA, feature engineering, training XGBoost with optuna hyperparameter tuning, cross-validation, and a stacking ensemble. Submit to Kaggle and target the top 30%.',
    youtubeQuery: 'machine learning course Python scikit-learn XGBoost complete 2024',
    docsUrl: 'https://scikit-learn.org/stable/user_guide.html'
  },
  {
    id: 'supervised-learning',
    label: 'Supervised Learning',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: false,
    parent: 'machine-learning',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 weeks',
    whyMatters: 'Supervised learning is the most commonly applied form of ML in production — fraud detection, churn prediction, price forecasting, recommendation systems. Understanding the mechanics of linear regression, logistic regression, and decision trees gives you a mental model for every more complex algorithm that follows. These algorithms are also often the right choice for interpretability-constrained business problems.',
    learn: [
      'Linear regression: OLS derivation, assumptions, when they are violated',
      'Logistic regression: sigmoid, log-loss, multiclass with softmax',
      'Decision trees: information gain, Gini impurity, pruning, depth control',
      'Random forests: bagging, feature subsampling, out-of-bag error',
      'Support Vector Machines: maximum margin, kernel trick, C and gamma',
      'K-Nearest Neighbours: distance metrics, curse of dimensionality',
      'Naive Bayes: Gaussian, Multinomial, Bernoulli variants'
    ],
    prerequisites: 'Data Science',
    task: 'Compete on the Titanic Kaggle competition. Build 5 models (logistic regression, decision tree, random forest, SVM, KNN), tune each with GridSearchCV, compare their ROC-AUC scores with cross-validation, and write a 300-word analysis of which model performs best and why.',
    youtubeQuery: 'supervised learning algorithms explained scikit-learn Python tutorial',
    docsUrl: 'https://scikit-learn.org/stable/supervised_learning.html'
  },
  {
    id: 'unsupervised-learning',
    label: 'Unsupervised Learning',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: false,
    parent: 'machine-learning',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Most real-world data is unlabelled. Unsupervised learning lets you find structure, compress representations, and generate features without expensive labelling. Clustering is used for customer segmentation, anomaly detection, and recommendation. PCA and UMAP are used to visualise high-dimensional data and as preprocessing steps before supervised learning.',
    learn: [
      'K-means clustering: algorithm, k selection (elbow method, silhouette score)',
      'Hierarchical clustering: dendrograms, linkage methods, cutting the tree',
      'DBSCAN: density-based clustering for arbitrary shapes, noise handling',
      'PCA: dimensionality reduction, explained variance ratio, scree plot',
      'UMAP and t-SNE: non-linear dimensionality reduction for visualisation',
      'Autoencoders: learning compressed representations with neural networks',
      'Gaussian Mixture Models: soft clustering with EM algorithm'
    ],
    prerequisites: 'Supervised Learning',
    task: 'Apply unsupervised learning to customer segmentation: load a retail transaction dataset, engineer RFM (Recency, Frequency, Monetary) features, scale them, apply k-means and DBSCAN, compare with silhouette score, and visualise segments in 2D with UMAP. Write a business interpretation of each segment.',
    youtubeQuery: 'unsupervised learning k-means clustering PCA UMAP Python tutorial',
    docsUrl: 'https://scikit-learn.org/stable/unsupervised_learning.html'
  },
  {
    id: 'sklearn',
    label: 'Scikit-learn',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: false,
    parent: 'machine-learning',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 week',
    whyMatters: 'Scikit-learn is the standard Python ML library for classical machine learning. Its consistent API (every estimator has fit/predict/transform) means you only need to learn the pattern once. More importantly, Pipeline and ColumnTransformer let you build preprocessing + modelling pipelines that are reusable, prevent data leakage, and can be serialised for production deployment.',
    learn: [
      'Estimator API: fit(X_train, y_train), predict(X_test), score(X_test, y_test)',
      'Pipeline: chaining preprocessors and estimators into a single reusable object',
      'ColumnTransformer: applying different transformations to different feature groups',
      'GridSearchCV and RandomizedSearchCV for hyperparameter tuning',
      'Cross-validation: cross_val_score, StratifiedKFold for imbalanced datasets',
      'Model persistence: joblib.dump and joblib.load for saving and loading models',
      'Custom transformers: inheriting from BaseEstimator and TransformerMixin'
    ],
    prerequisites: 'Data Science',
    task: 'Build a production-ready sklearn Pipeline for predicting house prices: ColumnTransformer with SimpleImputer + OneHotEncoder for categoricals and StandardScaler + PolynomialFeatures for numerics, a Ridge regressor, RandomizedSearchCV for tuning, and serialize the final pipeline with joblib. The pipeline must run on raw unseen test data without any preprocessing outside it.',
    youtubeQuery: 'scikit-learn Pipeline ColumnTransformer GridSearchCV tutorial 2024',
    docsUrl: 'https://scikit-learn.org/stable/modules/compose.html'
  },
  {
    id: 'model-evaluation',
    label: 'Model Evaluation',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: false,
    parent: 'machine-learning',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Choosing the wrong evaluation metric is one of the most expensive mistakes in production ML. A 99% accurate fraud detector is worthless if 99% of transactions are legitimate. Understanding precision, recall, AUC-ROC, and calibration lets you align model performance with business objectives. Cross-validation strategy determines whether your reported performance is trustworthy.',
    learn: [
      'Classification metrics: accuracy, precision, recall, F1, confusion matrix',
      'ROC curve and AUC-ROC: operating at different decision thresholds',
      'Precision-recall curve: better for imbalanced datasets than ROC',
      'Regression metrics: MAE, MSE, RMSE, R², MAPE and their sensitivities',
      'K-fold, stratified k-fold, time-series split for temporal data',
      'Calibration curves: is a predicted 70% probability actually 70% accurate?',
      'Statistical significance: paired t-test for comparing two models'
    ],
    prerequisites: 'Supervised Learning',
    task: 'Build a credit card fraud detector on a highly imbalanced dataset. Compare five models on: accuracy, F1, ROC-AUC, and PR-AUC. Tune the decision threshold for each model to maximise F1. Draw calibration curves for all models. Write a 400-word recommendation on which metric the business should optimise.',
    youtubeQuery: 'model evaluation metrics classification regression Python scikit-learn',
    docsUrl: 'https://scikit-learn.org/stable/modules/model_evaluation.html'
  },
  {
    id: 'feature-engineering',
    label: 'Feature Engineering',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: false,
    parent: 'machine-learning',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1–2 weeks',
    whyMatters: 'Feature engineering is where intuition meets mathematics. The best Kaggle competitors win not with exotic models but with clever features. Domain knowledge encoded as features consistently outperforms raw inputs. Understanding target encoding, interaction features, and temporal feature extraction gives you the edge that separates a good ML practitioner from a great one.',
    learn: [
      'Interaction features: multiplying or combining two features to capture non-linearity',
      'Polynomial features and when they help vs when they overfit',
      'Target encoding: replacing a categorical with its mean target value',
      'Date/time features: extracting hour, day of week, month, is_holiday, lag features',
      'Text features: TF-IDF, bag-of-words for basic NLP tasks in tabular ML',
      'Aggregation features: groupby statistics (mean, std, max) for grouped data',
      'Feature selection: mutual information, SHAP values, recursive feature elimination'
    ],
    prerequisites: 'Supervised Learning, EDA',
    task: 'Join the House Prices Kaggle competition. Engineer at least 20 new features: room ratios, neighbourhood statistics, quality interaction terms, log-transformed skewed features, and basement/garage combinations. Use SHAP to identify your 15 most important features, remove the rest, and show that performance improves from the baseline.',
    youtubeQuery: 'feature engineering Python tutorial Kaggle XGBoost SHAP',
    docsUrl: 'https://featuretools.alteryx.com/en/stable/'
  },
  {
    id: 'gradient-boosting',
    label: 'Gradient Boosting',
    section: 4,
    sectionTitle: 'Machine Learning',
    isMain: false,
    parent: 'machine-learning',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'XGBoost, LightGBM, and CatBoost win Kaggle competitions on tabular data at a rate that no other algorithm class matches. In production, they power fraud detection, pricing engines, and search ranking at companies like Uber, Airbnb, and LinkedIn. Understanding the boosting algorithm — how each tree corrects the residuals of the previous — makes you a far more effective practitioner.',
    learn: [
      'Boosting intuition: ensembling weak learners by fitting residuals sequentially',
      'XGBoost: second-order gradients, column subsampling, regularisation terms λ and α',
      'LightGBM: leaf-wise growth vs level-wise, histogram binning for speed',
      'CatBoost: native categorical handling, ordered boosting to prevent target leakage',
      'Key hyperparameters: n_estimators, learning_rate, max_depth, subsample, colsample_bytree',
      'Early stopping: monitoring validation loss to prevent overfitting',
      'SHAP (SHapley Additive exPlanations): interpreting any model\'s predictions'
    ],
    prerequisites: 'Supervised Learning, Model Evaluation',
    task: 'Win (or come close to winning) the Spaceship Titanic Kaggle competition using LightGBM: engineer features from the cabin column, tune with optuna for 100 trials, use SHAP to identify the top-10 features, implement stacking with CatBoost as a second-level model, and document every experiment in MLflow.',
    youtubeQuery: 'XGBoost LightGBM CatBoost tutorial Python Kaggle tabular data 2024',
    docsUrl: 'https://lightgbm.readthedocs.io/en/latest/'
  },

  // ─────────────────────────────────────────────
  // SECTION 5 — DEEP LEARNING
  // ─────────────────────────────────────────────
  {
    id: 'deep-learning',
    label: 'Deep Learning',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: true,
    parent: null,
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '8–10 weeks',
    whyMatters: 'Deep learning is the technology behind GPT, DALL-E, AlphaFold, and virtually every major AI advance of the last decade. It has achieved superhuman performance on image recognition, speech, translation, and protein folding. Understanding how neural networks are built, trained, and debugged is the core technical skill of an AI engineer in 2024 and beyond.',
    learn: [
      'The neuron: weighted sum + activation function as the fundamental unit',
      'Backpropagation: how gradients flow backwards through layers',
      'PyTorch: the framework used by most AI researchers and increasingly production teams',
      'Convolutional neural networks for spatial data (images)',
      'Recurrent networks and LSTMs for sequential data (text, time series)',
      'Regularisation: dropout, batch normalisation, weight decay',
      'Modern optimisers: Adam, AdamW, cosine learning rate schedules'
    ],
    prerequisites: 'Machine Learning, Mathematics for AI',
    task: 'Train a ResNet-18 from scratch on CIFAR-10: implement the training loop in pure PyTorch, use mixed precision training, implement early stopping with model checkpointing, plot training curves, and achieve >90% test accuracy. No high-level wrappers — raw PyTorch only.',
    youtubeQuery: 'deep learning with PyTorch complete course 2024',
    docsUrl: 'https://pytorch.org/tutorials/'
  },
  {
    id: 'neural-networks',
    label: 'Neural Networks',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: false,
    parent: 'deep-learning',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '2 weeks',
    whyMatters: 'Understanding the mechanics of a neural network — not just "it magically learns" — is what separates engineers who can debug failing models from those who cannot. Knowing that vanishing gradients are caused by saturating activations, or that a dead ReLU problem is a specific failure mode, lets you fix problems in minutes instead of days.',
    learn: [
      'Feedforward network: layers as linear transformations + non-linearities',
      'Activation functions: ReLU, Leaky ReLU, GELU, Swish — and why sigmoid is dangerous',
      'Forward pass: computing predictions from input through hidden layers',
      'Loss functions: MSE for regression, cross-entropy for classification',
      'Backpropagation: chain rule applied to compute ∂L/∂w for every weight',
      'Weight initialisation: He, Xavier/Glorot — why random is not good enough',
      'Universal approximation theorem: what neural networks can theoretically represent'
    ],
    prerequisites: 'Calculus & Gradients, Machine Learning',
    task: 'Implement a fully-connected neural network in pure NumPy without any framework. Include: forward pass, backpropagation with correct gradient accumulation, He initialisation, ReLU activation, cross-entropy loss. Train it on MNIST and achieve >96% accuracy. Compare against a PyTorch equivalent to verify your gradients are correct.',
    youtubeQuery: 'neural network from scratch NumPy backpropagation implementation tutorial',
    docsUrl: 'https://www.deeplearningbook.org/'
  },
  {
    id: 'pytorch',
    label: 'PyTorch',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: false,
    parent: 'deep-learning',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '2–3 weeks',
    whyMatters: 'PyTorch has become the dominant deep learning framework, used by 80%+ of AI research papers and increasingly in production. Its dynamic computation graph makes debugging feel like regular Python. Understanding tensor operations, autograd, and nn.Module is required for any AI engineering role — it is the skill interviewers test when you say you know deep learning.',
    learn: [
      'Tensors: creation, operations, GPU transfer (.to(device)), dtype control',
      'Autograd: requires_grad, .backward(), .grad, detaching gradients',
      'nn.Module: defining models as classes with __init__ and forward()',
      'nn.Linear, nn.Conv2d, nn.LSTM and their weight shapes',
      'DataLoader and Dataset: custom datasets, batching, shuffling, num_workers',
      'Training loop: zero_grad(), forward, loss, backward(), optimizer.step()',
      'torch.save / torch.load: checkpoint saving with state_dict()'
    ],
    prerequisites: 'Neural Networks',
    task: 'Build an image classifier in PyTorch from scratch: write a custom Dataset class for CIFAR-10, build a CNN model with 3 conv layers, implement the full training loop with progress bars, implement learning rate scheduling, save the best checkpoint, and plot training/validation curves. Target >85% test accuracy.',
    youtubeQuery: 'PyTorch complete tutorial 2024 neural network training loop',
    docsUrl: 'https://pytorch.org/tutorials/beginner/basics/intro.html'
  },
  {
    id: 'cnns',
    label: 'CNNs',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: false,
    parent: 'deep-learning',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '2 weeks',
    whyMatters: 'Convolutional Neural Networks are the foundation of computer vision. They are embedded in your phone\'s camera, autonomous vehicles, medical imaging systems, and satellite analysis tools. Even Transformers applied to images (ViT) are compared against CNN baselines. Understanding convolution, pooling, and the role of depth is essential for any computer vision work.',
    learn: [
      'Convolution operation: kernel, stride, padding, output size formula',
      'Feature maps: how early layers detect edges, later layers detect objects',
      'Pooling: max pooling, average pooling, global average pooling',
      'CNN architectures: LeNet → AlexNet → VGG → ResNet — what changed and why',
      'Residual connections: why they solve vanishing gradients in very deep networks',
      'Transfer learning: loading pretrained weights, freezing layers, fine-tuning',
      'Data augmentation for images: random crop, flip, colour jitter, CutMix'
    ],
    prerequisites: 'PyTorch',
    task: 'Fine-tune a pretrained ResNet-50 from torchvision on a custom image classification task (download any 5-class dataset from Kaggle). Compare: (a) feature extraction (frozen backbone), (b) full fine-tuning. Use learning rate warmup, cosine decay, and mixed precision. Target top-1 accuracy >92%.',
    youtubeQuery: 'CNN convolutional neural network PyTorch ResNet transfer learning tutorial',
    docsUrl: 'https://pytorch.org/vision/stable/models.html'
  },
  {
    id: 'rnns-lstms',
    label: 'RNNs & LSTMs',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: false,
    parent: 'deep-learning',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '1–2 weeks',
    whyMatters: 'While Transformers have largely replaced RNNs for NLP, LSTMs remain relevant for time-series forecasting, anomaly detection, and streaming scenarios where Transformers are too expensive. More importantly, understanding the vanishing gradient problem that motivated LSTMs directly prepares you to understand why attention mechanisms in Transformers work better.',
    learn: [
      'Vanilla RNN: hidden state recurrence, unrolling through time',
      'Vanishing gradient problem: why gradients shrink exponentially over long sequences',
      'LSTM: cell state, forget gate, input gate, output gate — the gating mechanism',
      'GRU: simplified LSTM with reset and update gates',
      'Sequence-to-sequence: encoder-decoder architecture for translation',
      'Bidirectional RNNs: reading sequences both forward and backward',
      'Packed sequences in PyTorch: handling variable-length inputs efficiently'
    ],
    prerequisites: 'PyTorch',
    task: 'Build a time series forecaster for stock price prediction using an LSTM: create sequences with a sliding window, normalise input, build a multi-layer bidirectional LSTM, implement sequence padding for variable-length inputs, and forecast 30 days ahead. Compare LSTM vs a simple linear baseline on RMSE.',
    youtubeQuery: 'LSTM time series forecasting PyTorch tutorial explained',
    docsUrl: 'https://pytorch.org/docs/stable/generated/torch.nn.LSTM.html'
  },
  {
    id: 'optimisation',
    label: 'Optimisation',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: false,
    parent: 'deep-learning',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'The optimiser and learning rate schedule are the dials that determine whether your model converges quickly, slowly, or not at all. Using Adam with a fixed learning rate is fine for small projects, but for serious training runs, AdamW + cosine decay with warmup is table stakes. Understanding why momentum and adaptive learning rates help is essential for debugging slow or unstable training.',
    learn: [
      'SGD with momentum: building velocity in gradient directions',
      'AdaGrad and RMSProp: per-parameter adaptive learning rates',
      'Adam: combining momentum and adaptive rates — the default choice',
      'AdamW: Adam with decoupled weight decay — better for transformers',
      'Learning rate schedules: cosine annealing, linear warmup, OneCycleLR',
      'Gradient clipping: preventing exploding gradients with clip_grad_norm_',
      'Mixed precision training with torch.cuda.amp: 2x speed, 2x memory savings'
    ],
    prerequisites: 'Neural Networks',
    task: 'Run a systematic training study on CIFAR-10: compare SGD, Adam, and AdamW with identical architectures; compare constant LR vs cosine decay vs OneCycleLR; implement mixed precision training. Plot all training curves together, measure wall-clock time per epoch, and write a summary of the optimal configuration.',
    youtubeQuery: 'deep learning optimisation AdamW learning rate schedules PyTorch tutorial',
    docsUrl: 'https://pytorch.org/docs/stable/optim.html'
  },
  {
    id: 'regularisation',
    label: 'Regularisation',
    section: 5,
    sectionTitle: 'Deep Learning',
    isMain: false,
    parent: 'deep-learning',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Overfitting is the most common failure mode when training neural networks. A model with 98% training accuracy and 72% validation accuracy is useless in production. Dropout, batch normalisation, and data augmentation are not optional techniques — they are required for training any serious model. Understanding why each works (and when they conflict) makes you an effective practitioner.',
    learn: [
      'Overfitting diagnosis: train vs validation loss curves, generalisation gap',
      'Dropout: randomly zeroing activations during training, p=0.1–0.5 for different layers',
      'Batch normalisation: normalising layer inputs, γ and β learnable parameters',
      'Layer normalisation: preferred over batch norm for transformers and small batches',
      'Weight decay (L2 regularisation): penalising large weights in the loss function',
      'Data augmentation: the single most effective regulariser for images',
      'Early stopping: monitoring validation loss and restoring best checkpoint'
    ],
    prerequisites: 'Neural Networks',
    task: 'Design a regularisation ablation study on CIFAR-100: train the same ResNet with 8 different configurations (all regularisers on, each one removed, all off). Track train/val accuracy, generalisation gap, and final test accuracy. Write a 400-word analysis of which regulariser contributes most.',
    youtubeQuery: 'regularisation deep learning dropout batch normalization tutorial',
    docsUrl: 'https://pytorch.org/docs/stable/nn.html'
  },

  // ─────────────────────────────────────────────
  // SECTION 6 — NLP & TRANSFORMERS
  // ─────────────────────────────────────────────
  {
    id: 'nlp-transformers',
    label: 'NLP & Transformers',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: true,
    parent: null,
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '6–8 weeks',
    whyMatters: 'The transformer architecture has become the most important model architecture in AI history. GPT, BERT, T5, LLaMA, and virtually every state-of-the-art NLP system is built on transformers. NLP is the fastest-growing area of AI employment. Understanding transformers from first principles — attention, positional encoding, tokenisation — is essential for anyone building or deploying language AI systems.',
    learn: [
      'Text preprocessing: tokenisation, vocabulary building, subword encoding',
      'Word embeddings: word2vec, GloVe and the distributional hypothesis',
      'Attention mechanism: queries, keys, values and scaled dot-product attention',
      'Transformer architecture: multi-head attention, feed-forward, layer norm, positional encoding',
      'BERT vs GPT: bidirectional vs autoregressive pretraining objectives',
      'The Hugging Face ecosystem: transformers, datasets, tokenizers libraries',
      'Fine-tuning LLMs: LoRA, QLoRA, PEFT for efficient adaptation'
    ],
    prerequisites: 'Deep Learning',
    task: 'Fine-tune BERT for a real NLP task: download a multi-label text classification dataset, tokenise with Hugging Face, fine-tune with AdamW and warmup, achieve competitive performance, and deploy as a FastAPI endpoint that accepts text and returns predictions in <200ms.',
    youtubeQuery: 'transformers BERT fine-tuning Hugging Face NLP tutorial 2024',
    docsUrl: 'https://huggingface.co/docs/transformers/index'
  },
  {
    id: 'text-processing',
    label: 'Text Processing',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: false,
    parent: 'nlp-transformers',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 week',
    whyMatters: 'Before any NLP model can process text, it must be converted into numbers. The quality of tokenisation directly affects model performance: poorly tokenised text creates vocabulary mismatches that degrade results. Understanding the difference between word-level, character-level, and subword tokenisation explains why LLMs can handle unusual words and code, while older approaches could not.',
    learn: [
      'Text cleaning: lowercasing, punctuation removal, unicode normalisation',
      'Tokenisation strategies: whitespace, word-level, character-level',
      'Subword tokenisation: BPE (GPT), WordPiece (BERT), SentencePiece (T5)',
      'Stop word removal and stemming/lemmatisation with NLTK and spaCy',
      'Regular expressions for text extraction and pattern matching',
      'Vocabulary building: term frequency, inverse document frequency (TF-IDF)',
      'spaCy pipeline: tokeniser, tagger, parser, NER in a single pass'
    ],
    prerequisites: 'Python Foundations',
    task: 'Build a text preprocessing pipeline with spaCy: process 10,000 news articles, extract named entities (ORG, PERSON, GPE), compute TF-IDF scores, identify the most salient terms per category, and produce a word cloud. Compare BPE vs WordPiece tokenisation on a sample of the text using Hugging Face tokenizers.',
    youtubeQuery: 'NLP text preprocessing spaCy NLTK tokenisation Python tutorial',
    docsUrl: 'https://spacy.io/usage/linguistic-features'
  },
  {
    id: 'word-embeddings',
    label: 'Word Embeddings',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: false,
    parent: 'nlp-transformers',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Word embeddings are the bridge between symbolic text and neural networks. The idea that "you shall know a word by the company it keeps" (the distributional hypothesis) powers word2vec, GloVe, and the initial embedding layers of every transformer. Understanding how embeddings encode semantic relationships — king − man + woman ≈ queen — builds intuition for how all language models represent meaning.',
    learn: [
      'Word2Vec: skip-gram and CBOW architectures, negative sampling',
      'GloVe: global co-occurrence matrix factorisation',
      'Embedding analogies: king − man + woman = queen and what it reveals',
      'Embedding initialisation in PyTorch with nn.Embedding',
      'Contextual embeddings vs static embeddings: why BERT embeddings are context-dependent',
      'Sentence embeddings: mean pooling, [CLS] token, sentence-transformers library',
      'Visualising embeddings in 2D with UMAP or t-SNE'
    ],
    prerequisites: 'Neural Networks, Text Processing',
    task: 'Train a word2vec model from scratch using gensim on a Wikipedia dump. Evaluate it on word analogy tasks (capital-country, man-woman). Visualise 100 word clusters in 2D. Then compare your static embeddings against BERT contextual embeddings on a word similarity benchmark (SimLex-999).',
    youtubeQuery: 'word embeddings word2vec GloVe sentence transformers tutorial',
    docsUrl: 'https://www.tensorflow.org/text/tutorials/word2vec'
  },
  {
    id: 'transformer-arch',
    label: 'Transformer Architecture',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: false,
    parent: 'nlp-transformers',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'The "Attention Is All You Need" transformer is the most important architecture in modern AI. Every large language model, every image generation model, and most protein structure predictors are built on it. Understanding self-attention, multi-head attention, and positional encoding is not optional if you plan to work at the frontier of AI. This knowledge separates practitioners who use AI from engineers who build it.',
    learn: [
      'Self-attention: QKV projections, scaled dot-product attention, softmax normalisation',
      'Multi-head attention: attending to multiple representation subspaces simultaneously',
      'Positional encoding: sinusoidal (original), learned, RoPE (rotary position embedding)',
      'Transformer block: layer norm → multi-head attention → residual → layer norm → FFN → residual',
      'Pre-norm vs post-norm: why pre-norm (used in LLaMA) is more stable',
      'Encoder-only (BERT), decoder-only (GPT), encoder-decoder (T5) architectures',
      'KV cache: how inference is accelerated by caching past key-value pairs'
    ],
    prerequisites: 'Neural Networks, Word Embeddings',
    task: 'Implement a transformer from scratch in pure PyTorch. Build a small GPT (character-level) trained on Shakespeare: implement multi-head self-attention, positional encoding, causal masking, and the training loop. Generate text samples at different temperatures. Your implementation should match Andrej Karpathy\'s nanoGPT in architecture.',
    youtubeQuery: 'transformer architecture implementation from scratch PyTorch Karpathy',
    docsUrl: 'https://nlp.seas.harvard.edu/annotated-transformer/'
  },
  {
    id: 'hugging-face',
    label: 'Hugging Face',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: false,
    parent: 'nlp-transformers',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '2 weeks',
    whyMatters: 'Hugging Face is the GitHub of machine learning models. The transformers library gives you access to 500,000+ pretrained models with a consistent API. The datasets library provides one-line access to thousands of NLP benchmarks. In 2024, knowing Hugging Face is as essential as knowing PyTorch. It is listed on the majority of ML/NLP job descriptions.',
    learn: [
      'from_pretrained(): loading tokenizers and models in one line',
      'Pipelines: the fastest way to run inference on text classification, NER, generation',
      'Trainer API: high-level training loop with logging, evaluation, and checkpointing',
      'datasets library: load_dataset(), dataset.map() for efficient preprocessing',
      'Model Hub: finding, evaluating, and uploading models with model cards',
      'Tokenizer padding and truncation strategies for batch processing',
      'AutoModel and AutoTokenizer: architecture-agnostic model loading'
    ],
    prerequisites: 'PyTorch, Text Processing',
    task: 'Use Hugging Face to: (1) run zero-shot classification on 1,000 news articles using a BART-MNLI model, (2) fine-tune DistilBERT on SST-2 sentiment dataset using the Trainer API, (3) upload your fine-tuned model to the Hub with a model card, and (4) build a Gradio demo that lets users type text and see the sentiment prediction.',
    youtubeQuery: 'Hugging Face transformers tutorial 2024 fine-tuning BERT Trainer API',
    docsUrl: 'https://huggingface.co/docs/transformers/training'
  },
  {
    id: 'fine-tuning-llms',
    label: 'Fine-tuning LLMs',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: false,
    parent: 'nlp-transformers',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Fine-tuning large language models is one of the highest-value skills in AI engineering today. Companies need models specialised for their domain, tone, and tasks. Full fine-tuning is often impractical at scale, but parameter-efficient methods like LoRA and QLoRA make it possible to adapt a 7B+ model on a single consumer GPU. This is the skill that unlocks building custom AI products.',
    learn: [
      'Full fine-tuning vs parameter-efficient fine-tuning (PEFT) trade-offs',
      'LoRA: Low-Rank Adaptation — adding trainable rank decomposition matrices to attention',
      'QLoRA: 4-bit quantised LoRA for fine-tuning 7B+ models on a single GPU',
      'Instruction tuning: fine-tuning on (instruction, response) pairs',
      'DPO (Direct Preference Optimisation): aligning LLMs with human feedback without RL',
      'Evaluation: ROUGE, perplexity, and LLM-as-judge for generative tasks',
      'Flash Attention 2 and gradient checkpointing for memory-efficient training'
    ],
    prerequisites: 'Hugging Face, Transformer Architecture',
    task: 'Fine-tune Llama-3.1-8B-Instruct using QLoRA on a domain-specific instruction dataset (e.g. medical Q&A or legal documents). Use TRL\'s SFTTrainer, implement gradient checkpointing, push the LoRA adapter to Hugging Face Hub, and evaluate on a held-out test set using ROUGE-L and LLM-as-judge scoring.',
    youtubeQuery: 'fine-tuning LLM LoRA QLoRA Llama tutorial 2024 Hugging Face',
    docsUrl: 'https://huggingface.co/docs/peft/index'
  },
  {
    id: 'rag',
    label: 'RAG',
    section: 6,
    sectionTitle: 'NLP & Transformers',
    isMain: false,
    parent: 'nlp-transformers',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Retrieval-Augmented Generation (RAG) is the dominant architecture for building knowledge-intensive LLM applications. It solves the two biggest LLM limitations: hallucination and knowledge cutoff. Every enterprise AI product — legal research, customer support, internal knowledge bases — is built on some form of RAG. Understanding dense retrieval, chunking strategies, and re-ranking is essential for building production AI applications.',
    learn: [
      'RAG pipeline: query → retrieve → augment context → generate → response',
      'Document chunking: fixed-size, semantic, sentence-based strategies',
      'Dense retrieval: embedding queries and documents, cosine similarity search',
      'Vector databases: FAISS, Chroma, Pinecone, Qdrant — trade-offs and use cases',
      'Hybrid search: combining BM25 sparse retrieval with dense embeddings',
      'Re-ranking: using a cross-encoder to re-score the top-k retrieved chunks',
      'Evaluation: RAGAS framework for measuring faithfulness, answer relevance, context recall'
    ],
    prerequisites: 'Fine-tuning LLMs, Vector Databases',
    task: 'Build a production-quality RAG system over your own document set (use Arxiv papers or company documentation). Implement chunking with LangChain, embedding with sentence-transformers, storage in Chroma, hybrid retrieval with BM25 + dense, and a cross-encoder reranker. Evaluate with RAGAS and compare naive RAG vs advanced RAG.',
    youtubeQuery: 'RAG retrieval augmented generation LangChain vector database tutorial 2024',
    docsUrl: 'https://python.langchain.com/docs/tutorials/rag/'
  },

  // ─────────────────────────────────────────────
  // SECTION 7 — COMPUTER VISION
  // ─────────────────────────────────────────────
  {
    id: 'computer-vision',
    label: 'Computer Vision',
    section: 7,
    sectionTitle: 'Computer Vision',
    isMain: true,
    parent: null,
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '6–8 weeks',
    whyMatters: 'Computer vision powers autonomous vehicles, medical diagnostics, satellite analysis, and quality control in manufacturing. The ability to give machines the ability to see and interpret images is one of the most commercially valuable AI skills. From object detection APIs to generating images with diffusion models, computer vision engineers are among the highest-paid in the AI field.',
    learn: [
      'Classical image processing: filters, morphological operations, edge detection',
      'Object detection: from R-CNN to YOLO — the evolution of the detection paradigm',
      'Semantic and instance segmentation: pixel-level understanding with Mask R-CNN',
      'Modern vision models: ViT, CLIP, DINO — transformers applied to vision',
      'Generative models: GANs for style transfer, diffusion models for photorealistic synthesis',
      'Albumentations for computer vision-specific data augmentation',
      'ONNX export and TensorRT optimisation for deployment'
    ],
    prerequisites: 'Deep Learning',
    task: 'Build an end-to-end defect detection system: fine-tune YOLO on a custom dataset (e.g. PCB defects), implement real-time inference with OpenCV, export to ONNX, optimise with TensorRT, and benchmark latency on GPU and CPU. The system should detect defects in <30ms per frame.',
    youtubeQuery: 'computer vision PyTorch YOLO object detection segmentation 2024',
    docsUrl: 'https://pytorch.org/vision/stable/index.html'
  },
  {
    id: 'image-processing',
    label: 'Image Processing',
    section: 7,
    sectionTitle: 'Computer Vision',
    isMain: false,
    parent: 'computer-vision',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Classical image processing is the foundation layer of computer vision. OpenCV is used in production for preprocessing, augmentation, and post-processing in every CV pipeline. Understanding colour spaces, convolution filters, and morphological operations lets you preprocess images effectively and debug when your neural network receives malformed inputs.',
    learn: [
      'OpenCV basics: reading, writing, displaying images, BGR vs RGB',
      'Colour spaces: BGR, RGB, HSV, Lab and when to use each',
      'Geometric transforms: resize, rotate, flip, warp affine, perspective transform',
      'Image filtering: Gaussian blur, median blur, bilateral filter',
      'Edge detection: Sobel, Canny, Laplacian and their uses',
      'Morphological operations: erosion, dilation, opening, closing for binary images',
      'Albumentations: fast augmentation with 70+ transforms, including cutout and mixup'
    ],
    prerequisites: 'NumPy, CNNs',
    task: 'Build an image preprocessing pipeline for a CV dataset: implement augmentation (random flip, rotation, colour jitter, random erasing) with Albumentations, visualise the augmented samples, compute per-channel mean and std for normalisation, and verify your DataLoader produces correct normalised batches with correct shapes and dtypes.',
    youtubeQuery: 'OpenCV Python tutorial image processing Albumentations augmentation',
    docsUrl: 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html'
  },
  {
    id: 'object-detection',
    label: 'Object Detection',
    section: 7,
    sectionTitle: 'Computer Vision',
    isMain: false,
    parent: 'computer-vision',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Object detection is one of the most commercially deployed CV tasks — from counting products on shelves to detecting pedestrians in autonomous vehicles. YOLO models are the industry standard for real-time detection. Understanding anchor boxes, IoU, non-maximum suppression, and the COCO evaluation metrics lets you approach any detection problem professionally.',
    learn: [
      'Two-stage detection: R-CNN → Fast R-CNN → Faster R-CNN evolution',
      'One-stage detection: SSD, RetinaNet, and the focal loss for class imbalance',
      'YOLO family: YOLOv5, YOLOv8, YOLO11 — understanding the architecture',
      'Anchor boxes and anchor-free detection (FCOS, CenterPoint)',
      'IoU: Intersection over Union for bounding box quality measurement',
      'Non-maximum suppression (NMS): removing duplicate detections',
      'COCO metrics: mAP@0.5, mAP@0.5:0.95 and how to interpret them'
    ],
    prerequisites: 'CNNs, Image Processing',
    task: 'Train YOLOv8 on a custom dataset using Roboflow to annotate and export. Train for 100 epochs, monitor mAP@0.5 curve, implement test-time augmentation, and export to ONNX. Build a demo that runs real-time detection on webcam feed at >20 FPS. Submit your trained model to Hugging Face Hub.',
    youtubeQuery: 'YOLOv8 object detection custom dataset training tutorial 2024',
    docsUrl: 'https://docs.ultralytics.com/'
  },
  {
    id: 'image-segmentation',
    label: 'Image Segmentation',
    section: 7,
    sectionTitle: 'Computer Vision',
    isMain: false,
    parent: 'computer-vision',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '1–2 weeks',
    whyMatters: 'Segmentation goes beyond detection to understand exactly which pixels belong to each object. It is essential in medical imaging (tumour delineation), autonomous driving (road vs pedestrian), and satellite analysis (building footprints). Segment Anything Model (SAM) from Meta has made zero-shot segmentation practical for the first time, fundamentally changing how segmentation is approached.',
    learn: [
      'Semantic segmentation: assigning a class to every pixel (FCN, U-Net)',
      'Instance segmentation: distinguishing individual object instances (Mask R-CNN)',
      'Panoptic segmentation: combining semantic and instance segmentation',
      'U-Net architecture: encoder-decoder with skip connections for medical imaging',
      'DeepLab v3+: atrous convolution and ASPP for multi-scale context',
      'Segment Anything Model (SAM): zero-shot segmentation with point/box/mask prompts',
      'Evaluation: pixel accuracy, mean IoU (mIoU), Dice coefficient'
    ],
    prerequisites: 'Object Detection',
    task: 'Build a medical image segmentation system using U-Net on the ISIC skin lesion dataset: implement the U-Net architecture from scratch, add Dice loss, implement test-time augmentation, and compare against SAM with bounding box prompts on the same test set. Measure Dice coefficient and mIoU for both approaches.',
    youtubeQuery: 'image segmentation U-Net SAM tutorial PyTorch 2024',
    docsUrl: 'https://segment-anything.com/'
  },
  {
    id: 'gans',
    label: 'GANs',
    section: 7,
    sectionTitle: 'Computer Vision',
    isMain: false,
    parent: 'computer-vision',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Generative Adversarial Networks introduced the idea of training two networks in competition — a generator and a discriminator — that has influenced the entire field of generative modelling. StyleGAN-generated faces are indistinguishable from real photos. Understanding GANs prepares you to understand the entire lineage of generative models, including diffusion models that succeeded them.',
    learn: [
      'GAN architecture: generator G vs discriminator D in a minimax game',
      'Original GAN loss and the vanishing gradient problem in discriminator training',
      'DCGAN: using convolutions for stable image generation',
      'Wasserstein GAN (WGAN): gradient penalty for stable training',
      'Conditional GAN (cGAN) and pix2pix: conditioning generation on labels or images',
      'StyleGAN2: the state-of-the-art for high-resolution face generation',
      'Mode collapse: symptoms, diagnosis, and mitigation strategies'
    ],
    prerequisites: 'CNNs, PyTorch',
    task: 'Implement a DCGAN in PyTorch to generate 64×64 celebrity face images using CelebA. Monitor the generator and discriminator loss curves, implement FID score evaluation, visualise generated samples every epoch, and compare DCGAN vs WGAN-GP stability on the same dataset.',
    youtubeQuery: 'GAN generative adversarial network PyTorch tutorial DCGAN StyleGAN',
    docsUrl: 'https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html'
  },
  {
    id: 'diffusion-models',
    label: 'Diffusion Models',
    section: 7,
    sectionTitle: 'Computer Vision',
    isMain: false,
    parent: 'computer-vision',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Diffusion models are the technology behind Stable Diffusion, DALL-E 3, and Midjourney — the most impactful image generation systems ever created. They have also been applied to protein design (AlphaFold3), drug discovery, and audio generation. Understanding the diffusion process, U-Net denoiser, and DDPM sampling is essential for anyone working on generative AI.',
    learn: [
      'Diffusion intuition: progressively adding noise to data, then learning to reverse it',
      'DDPM (Denoising Diffusion Probabilistic Models): the foundational paper',
      'U-Net denoiser: predicting the noise εθ(xₜ, t) at each timestep',
      'DDIM: deterministic sampling that is 10x faster than DDPM',
      'Stable Diffusion: latent diffusion with a VAE and CLIP text conditioning',
      'ControlNet: conditioning generation on depth, pose, edge maps',
      'Hugging Face Diffusers library: running and fine-tuning diffusion models'
    ],
    prerequisites: 'CNNs, PyTorch, Transformer Architecture',
    task: 'Implement DDPM from scratch in PyTorch: build the noise schedule, forward diffusion process, U-Net denoiser with sinusoidal time embeddings, and reverse sampling loop. Train on MNIST and generate samples. Then use Hugging Face Diffusers to fine-tune Stable Diffusion on a 10-image concept using DreamBooth.',
    youtubeQuery: 'diffusion models DDPM implementation PyTorch tutorial stable diffusion',
    docsUrl: 'https://huggingface.co/docs/diffusers/index'
  },

  // ─────────────────────────────────────────────
  // SECTION 8 — AI AGENTS
  // ─────────────────────────────────────────────
  {
    id: 'ai-agents',
    label: 'AI Agents',
    section: 8,
    sectionTitle: 'AI Agents',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '4–6 weeks',
    whyMatters: 'AI agents represent the next frontier of AI applications — systems that can autonomously plan, use tools, and execute multi-step tasks. Every major AI company (OpenAI, Anthropic, Google) has agent products. Companies are replacing entire workflows with agent pipelines. Building agentic systems with LangChain, LlamaIndex, and tool use is one of the most in-demand skills in the AI job market right now.',
    learn: [
      'The ReAct loop: Reason + Act + Observe until the task is complete',
      'Tool use and function calling: giving LLMs the ability to call external APIs',
      'LangChain for orchestrating LLM workflows and tool use',
      'LlamaIndex for building knowledge-intensive retrieval and query systems',
      'Multi-agent systems: agents that spawn, supervise, and communicate with other agents',
      'Memory and planning: short-term context, long-term vector store memory',
      'Agent evaluation: measuring task completion, tool call accuracy, efficiency'
    ],
    prerequisites: 'NLP & Transformers, RAG',
    task: 'Build an autonomous research agent using LangChain: equip it with web search (Tavily), Python code execution (E2B), and file reading tools. Give it the task of researching a topic, writing Python analysis code, running it, interpreting results, and writing a structured report. Evaluate on 10 different research tasks.',
    youtubeQuery: 'AI agents LangChain LlamaIndex tool use tutorial 2024',
    docsUrl: 'https://python.langchain.com/docs/concepts/agents/'
  },
  {
    id: 'langchain',
    label: 'LangChain',
    section: 8,
    sectionTitle: 'AI Agents',
    isMain: false,
    parent: 'ai-agents',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'LangChain is the most widely used framework for building LLM applications. It provides abstractions for chains (sequential LLM calls), agents (LLM + tools), memory (state between calls), and RAG. Despite its complexity, understanding LangChain is practically required for production LLM work — it handles the boilerplate of prompt management, output parsing, and tool integration that would otherwise take weeks to build.',
    learn: [
      'LCEL (LangChain Expression Language): composing chains with the | pipe operator',
      'PromptTemplate and ChatPromptTemplate for structured prompt management',
      'Output parsers: PydanticOutputParser, StrOutputParser, JSONOutputParser',
      'Document loaders: loading PDFs, web pages, Notion, GitHub into LangChain',
      'Text splitters: recursive character, markdown header, semantic splitting',
      'ConversationBufferMemory and VectorStoreRetrieverMemory for stateful agents',
      'Structured tools with @tool decorator and tool schemas for function calling'
    ],
    prerequisites: 'RAG, Python Foundations',
    task: 'Build a customer support agent with LangChain: load company documentation with PDF loader, split and embed into Chroma, build a conversational RAG chain with memory, add tools for order status lookup (mock API) and escalation to human, and add guardrails using LangChain callbacks to detect and log sensitive topics.',
    youtubeQuery: 'LangChain tutorial 2024 RAG agents chains LCEL complete guide',
    docsUrl: 'https://python.langchain.com/docs/introduction/'
  },
  {
    id: 'llamaindex',
    label: 'LlamaIndex',
    section: 8,
    sectionTitle: 'AI Agents',
    isMain: false,
    parent: 'ai-agents',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '1–2 weeks',
    whyMatters: 'LlamaIndex specialises in data indexing and query workflows for LLMs — the core problem of making large, heterogeneous knowledge bases queryable by LLMs. It excels where LangChain is too general: complex document hierarchies, multi-step query planning over structured and unstructured data, and sub-question decomposition. For building enterprise knowledge bases, LlamaIndex is often the better choice.',
    learn: [
      'Nodes and documents: the fundamental units of LlamaIndex indexing',
      'VectorStoreIndex: building a dense retrieval index from documents',
      'Query engines: converting natural language queries into structured data lookups',
      'Sub-question query engine: decomposing complex questions into sub-queries',
      'RouterQueryEngine: routing queries to the appropriate index',
      'Knowledge graph index: extracting and querying entity-relationship graphs',
      'LlamaIndex workflows: event-driven orchestration for complex agentic pipelines'
    ],
    prerequisites: 'LangChain, RAG',
    task: 'Build a multi-source research assistant with LlamaIndex: index 100 papers (PDFs), a SQL database of paper metadata, and a knowledge graph of citations. Implement a RouterQueryEngine that routes factual queries to the SQL engine and semantic queries to the vector index. Evaluate query accuracy on a hand-labelled test set of 50 questions.',
    youtubeQuery: 'LlamaIndex tutorial 2024 RAG knowledge graph query engine',
    docsUrl: 'https://docs.llamaindex.ai/en/stable/'
  },
  {
    id: 'tool-use',
    label: 'Tool Use & Function Calling',
    section: 8,
    sectionTitle: 'AI Agents',
    isMain: false,
    parent: 'ai-agents',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Function calling is the technology that converts LLMs from text generators into action-taking agents. It allows models to request structured data from APIs, execute code, search the web, and interact with databases. Understanding how to define tool schemas, handle tool outputs, and implement the agent loop is the fundamental skill for building any production AI automation.',
    learn: [
      'Function calling API: defining tools as JSON schemas for OpenAI, Claude, and Gemini',
      'The agent loop: generate → check for tool call → execute → append result → generate again',
      'Parallel tool calls: executing multiple tools simultaneously in one model turn',
      'Tool result handling: formatting tool outputs back into the conversation',
      'Claude\'s computer use API: tools for screenshot, mouse, keyboard actions',
      'Code interpreter: executing Python in a sandbox from an agent',
      'Structured outputs: forcing models to return JSON matching a Pydantic schema'
    ],
    prerequisites: 'Hugging Face',
    task: 'Build a data analysis agent using the Anthropic API with tool use: give it tools for running Python code (E2B sandbox), querying a SQL database, and fetching web data. Task it to analyse a dataset, produce visualisations, and write a report. Test on 5 different analysis tasks and evaluate tool call accuracy.',
    youtubeQuery: 'LLM function calling tool use agent loop tutorial 2024 OpenAI Anthropic',
    docsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use'
  },
  {
    id: 'multi-agent',
    label: 'Multi-Agent Systems',
    section: 8,
    sectionTitle: 'AI Agents',
    isMain: false,
    parent: 'ai-agents',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Single agents are limited by context window and the inability to parallelise. Multi-agent systems break complex tasks into specialised sub-agents: a planner, a researcher, a coder, and a critic working together. AutoGen, CrewAI, and LangGraph are production frameworks for orchestrating these systems. Companies building sophisticated AI automation are hiring engineers who understand multi-agent coordination.',
    learn: [
      'Multi-agent patterns: orchestrator + worker, peer-to-peer, hierarchical',
      'LangGraph: graph-based orchestration with nodes, edges, and conditional routing',
      'CrewAI: role-based agents with goals, backstories, and tasks',
      'AutoGen: conversational multi-agent with automated agent collaboration',
      'Agent communication protocols: how agents pass structured messages',
      'Error recovery: handling tool failures, hallucinations, and stuck agents',
      'Observability: tracing multi-agent runs with LangSmith or Arize Phoenix'
    ],
    prerequisites: 'LangChain, Tool Use & Function Calling',
    task: 'Build a multi-agent software engineering team using LangGraph: a Planner agent that decomposes tasks, a Coder agent that writes Python, a Tester agent that writes and runs unit tests, and a Reviewer agent that checks code quality. Give the team a feature request and evaluate end-to-end task completion on 5 programming challenges.',
    youtubeQuery: 'multi-agent LangGraph CrewAI AutoGen tutorial 2024 LLM',
    docsUrl: 'https://langchain-ai.github.io/langgraph/'
  },
  {
    id: 'memory-planning',
    label: 'Memory & Planning',
    section: 8,
    sectionTitle: 'AI Agents',
    isMain: false,
    parent: 'ai-agents',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Memory and planning are what separate reactive agents from truly autonomous ones. Without persistent memory, every conversation starts from zero. Without planning, agents cannot tackle tasks that require many steps and handling failures mid-way. Understanding short-term, long-term, and episodic memory architectures is essential for building agents that improve with use.',
    learn: [
      'Short-term memory: managing context window efficiently with summarisation',
      'Long-term memory: vector store with semantic search over past interactions',
      'Episodic memory: storing and retrieving past successful agent trajectories',
      'Planning algorithms: ReAct, Tree-of-Thought, MCTS for complex reasoning',
      'Plan-and-Execute: pre-generating a plan then executing step by step',
      'Reflection: agents that critique and refine their own outputs',
      'Mem0: persistent cross-session agent memory as a service'
    ],
    prerequisites: 'Multi-Agent Systems',
    task: 'Implement a personal productivity agent with persistent memory using Mem0: it should remember your tasks, preferences, and past interactions. Add a Tree-of-Thought planner for breaking down complex goals into sub-tasks. Evaluate after 1 week of real use: does it recall relevant past information correctly? Measure memory retrieval precision.',
    youtubeQuery: 'AI agent memory planning Mem0 LangChain reflection Tree of Thought tutorial',
    docsUrl: 'https://docs.mem0.ai/overview'
  },

  // ─────────────────────────────────────────────
  // SECTION 9 — MLOPS & PRODUCTION
  // ─────────────────────────────────────────────
  {
    id: 'mlops',
    label: 'MLOps',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '4–6 weeks',
    whyMatters: 'Training a model in a Jupyter notebook is only 20% of the work. Getting it into production reliably, monitoring it, and retraining when it drifts is the other 80%. MLOps skills are what transform a researcher into an ML engineer. Companies overwhelmingly report that the bottleneck is deployment and monitoring, not model accuracy. MLOps practitioners command some of the highest salaries in the field.',
    learn: [
      'The ML lifecycle: experiment → train → evaluate → deploy → monitor → retrain',
      'Experiment tracking: MLflow for logging runs, parameters, metrics, and artifacts',
      'Model serving: FastAPI for REST endpoints, batch inference patterns',
      'Containerisation: Docker for reproducible model serving environments',
      'CI/CD for ML: automated testing and deployment pipelines with GitHub Actions',
      'Model monitoring: detecting data drift, concept drift, and performance degradation',
      'Cloud ML platforms: AWS SageMaker, GCP Vertex AI for managed training and serving'
    ],
    prerequisites: 'Machine Learning, Deep Learning',
    task: 'Build a complete MLOps pipeline: train a model with MLflow experiment tracking, package it in a Docker container with a FastAPI endpoint, deploy to AWS or GCP with auto-scaling, set up Evidently AI monitoring to detect data drift, and implement a retraining trigger when drift exceeds a threshold.',
    youtubeQuery: 'MLOps pipeline MLflow Docker FastAPI AWS deployment tutorial 2024',
    docsUrl: 'https://mlflow.org/docs/latest/index.html'
  },
  {
    id: 'experiment-tracking',
    label: 'Experiment Tracking — MLflow',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: false,
    parent: 'mlops',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3–4 days',
    whyMatters: 'Without experiment tracking, ML development becomes a chaotic notebook graveyard. MLflow records every run\'s hyperparameters, metrics, and model artifacts so you can compare experiments, reproduce results, and understand which decisions led to improvements. Employers expect ML engineers to work within a tracked experimentation system from day one.',
    learn: [
      'MLflow Tracking: logging params, metrics, artifacts, tags with mlflow.log_*',
      'Autologging: mlflow.sklearn.autolog() and mlflow.pytorch.autolog()',
      'MLflow Projects: packaging code for reproducible runs with conda or Docker',
      'MLflow Models: saving models with standard flavors (sklearn, pytorch, onnx)',
      'MLflow Model Registry: versioning, staging, and promoting models to production',
      'Comparing runs in the MLflow UI: parallel coordinates, metric plots',
      'Weights & Biases (wandb) as an alternative with better visualisation'
    ],
    prerequisites: 'Machine Learning',
    task: 'Run 50 experiments comparing 5 classifiers × 10 hyperparameter combinations on a dataset of your choice. Log everything with MLflow: params, metrics per epoch, confusion matrices as images, and model artifacts. Use the MLflow UI to find the best run, register it in the Model Registry, and promote it to the Production stage.',
    youtubeQuery: 'MLflow experiment tracking tutorial Python machine learning 2024',
    docsUrl: 'https://mlflow.org/docs/latest/tracking.html'
  },
  {
    id: 'model-serving',
    label: 'Model Serving — FastAPI',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: false,
    parent: 'mlops',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'A model stuck in a Jupyter notebook helps no one. FastAPI is the de facto standard for building ML serving endpoints in Python — it is async, fast, auto-documented with OpenAPI, and natively supports Pydantic validation. Every production ML system eventually needs an API layer, and knowing how to build one correctly with proper input validation, async batching, and health checks is a core skill.',
    learn: [
      'FastAPI basics: routes, Pydantic models for request/response validation',
      'Async endpoints: async def for non-blocking I/O, concurrent request handling',
      'Loading ML models at startup with lifespan context managers',
      'Batch inference: grouping concurrent requests into efficient batches',
      'Background tasks: deferred processing for expensive operations',
      'Authentication: API key middleware, JWT tokens for securing endpoints',
      'Prometheus metrics: tracking request count, latency, and error rate'
    ],
    prerequisites: 'Machine Learning, Python Foundations',
    task: 'Build a production-grade sentiment analysis API: load a fine-tuned BERT model, expose POST /predict with Pydantic validation, implement dynamic batching (queue incoming requests and process in batches of 32), add Prometheus metrics, write a locust load test, and document latency under 100 concurrent users.',
    youtubeQuery: 'FastAPI ML model serving tutorial async batching Python 2024',
    docsUrl: 'https://fastapi.tiangolo.com/'
  },
  {
    id: 'docker',
    label: 'Docker & Containers',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: false,
    parent: 'mlops',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: '"It works on my machine" is a terminal diagnosis in production. Docker solves the reproducibility crisis in ML by packaging your model, dependencies, CUDA version, and serving code into a portable container. Every cloud ML platform (SageMaker, Vertex AI, Azure ML) accepts Docker images. Knowing Docker is required for deploying any ML system.',
    learn: [
      'Dockerfile: FROM, RUN, COPY, ENV, WORKDIR, EXPOSE, CMD instructions',
      'Multi-stage builds: using one stage to build, another for a slim runtime image',
      'docker-compose: running multi-service ML systems (API + database + monitoring)',
      'Layer caching: ordering instructions to maximise cache hits and speed up builds',
      'NVIDIA GPU support: nvidia/cuda base images, --gpus flag for GPU containers',
      'Registry: pushing images to Docker Hub or AWS ECR',
      'Health checks: HEALTHCHECK instruction and Kubernetes readiness probes'
    ],
    prerequisites: 'Model Serving — FastAPI',
    task: 'Containerise your ML serving API: write a multi-stage Dockerfile that builds a <1GB image with CUDA support, configure docker-compose with the API, Redis for caching, and Prometheus + Grafana for monitoring. Push to Docker Hub and deploy on a free tier cloud instance (Railway or Fly.io). Verify GPU inference works.',
    youtubeQuery: 'Docker tutorial for machine learning ML deployment containerization 2024',
    docsUrl: 'https://docs.docker.com/get-started/'
  },
  {
    id: 'cicd-ml',
    label: 'CI/CD for ML',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: false,
    parent: 'mlops',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Without CI/CD, every model update is a manual, error-prone process. With it, every code change triggers automated testing of data pipelines, model performance validation, and container deployment. ML-specific CI/CD catches regressions before they reach production — a model that performs worse on a slice of users can be caught before deployment if you have automated evaluation gates.',
    learn: [
      'GitHub Actions: YAML workflows triggered by push, PR, or schedule',
      'CML (Continuous Machine Learning): DVC + GitHub Actions for ML pipelines',
      'DVC (Data Version Control): versioning datasets and model artifacts in Git',
      'Model regression testing: automated evaluation against a baseline performance threshold',
      'Shadow deployment: routing a fraction of traffic to a new model without user impact',
      'Blue-green deployment: zero-downtime model updates with instant rollback',
      'Model cards: automated generation of performance reports as PR comments'
    ],
    prerequisites: 'Docker & Containers, Experiment Tracking',
    task: 'Build a complete CI/CD pipeline for an ML project with GitHub Actions: trigger on every push to main, run data validation tests, train a model (or pull from registry), run evaluation against a performance baseline, build and push a Docker image, deploy to staging, and require manual approval for production. Block deployment if test accuracy drops below threshold.',
    youtubeQuery: 'CI/CD machine learning GitHub Actions DVC CML tutorial 2024',
    docsUrl: 'https://dvc.org/doc'
  },
  {
    id: 'cloud-ml',
    label: 'Cloud Platforms — AWS/GCP',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: false,
    parent: 'mlops',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'Most production ML systems run on cloud platforms. AWS SageMaker and GCP Vertex AI provide managed infrastructure for training at scale, serving with auto-scaling, and monitoring — all without managing Kubernetes manually. Enterprise ML engineering roles specifically require cloud ML platform experience, and it is one of the highest compensation-boosting skills.',
    learn: [
      'AWS SageMaker: training jobs, endpoints, model registry, pipelines, Feature Store',
      'GCP Vertex AI: custom training, AutoML, model serving, Matching Engine for embeddings',
      'S3/GCS: object storage for datasets, model artifacts, training logs',
      'IAM roles and least-privilege permissions for ML workloads',
      'Spot/preemptible instances: training at 60–70% cost with checkpointing',
      'Kubernetes for ML: deploying inference on EKS/GKE with GPU node pools',
      'Cost optimisation: right-sizing instances, using managed spot, scheduling off-peak'
    ],
    prerequisites: 'Docker & Containers, CI/CD for ML',
    task: 'Deploy a complete ML pipeline on AWS: upload a dataset to S3, launch a SageMaker training job with a custom Docker container, register the model in SageMaker Model Registry, deploy to a real-time endpoint with auto-scaling, monitor endpoint metrics in CloudWatch, and configure a CloudWatch alarm to notify when latency exceeds 200ms.',
    youtubeQuery: 'AWS SageMaker GCP Vertex AI machine learning deployment tutorial 2024',
    docsUrl: 'https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html'
  },
  {
    id: 'monitoring-drift',
    label: 'Monitoring & Drift',
    section: 9,
    sectionTitle: 'MLOps & Production',
    isMain: false,
    parent: 'mlops',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Models degrade silently in production. The world changes, user behaviour shifts, and data distributions drift — your model keeps predicting, but accuracy falls without any error logs. Monitoring detects this degradation before it causes business damage. The infamous Amazon recruiting tool that learned to be sexist is an example of a model that should have had better monitoring.',
    learn: [
      'Data drift: detecting changes in the input feature distribution (KS test, PSI)',
      'Concept drift: target variable distribution shifting over time',
      'Performance monitoring: logging predictions and labels, computing metrics in windows',
      'Evidently AI: open-source data drift and model performance monitoring',
      'Grafana dashboards: visualising model metrics, drift scores, and error rates over time',
      'Alerting: PagerDuty/Slack alerts when metrics breach thresholds',
      'Shadow models: running a challenger model alongside production to detect improvements'
    ],
    prerequisites: 'Model Serving — FastAPI, CI/CD for ML',
    task: 'Build a monitoring stack for a deployed model: log predictions to a PostgreSQL database, compute daily data drift reports with Evidently AI against a reference dataset, build a Grafana dashboard showing prediction volume, drift score, and latency over 30 days. Trigger a Slack alert when drift exceeds 0.15 PSI on any feature.',
    youtubeQuery: 'ML model monitoring Evidently AI Grafana data drift tutorial 2024',
    docsUrl: 'https://docs.evidentlyai.com/'
  },

  // ─────────────────────────────────────────────
  // SECTION 10 — DATA ENGINEERING
  // ─────────────────────────────────────────────
  {
    id: 'data-engineering',
    label: 'Data Engineering',
    section: 10,
    sectionTitle: 'Data Engineering',
    isMain: true,
    parent: null,
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '4–6 weeks',
    whyMatters: 'Good models need good data pipelines. Data engineering is the infrastructure layer that gets data from sources (databases, APIs, logs) into a form that ML models can consume reliably and at scale. Understanding SQL, distributed computing with Spark, pipeline orchestration with Airflow, and vector databases for AI applications makes you a complete ML practitioner, not just a modelling specialist.',
    learn: [
      'SQL for data analysis: complex joins, window functions, CTEs, performance tuning',
      'Apache Spark for distributed data processing at scale',
      'Airflow for scheduling and orchestrating data and ML pipelines',
      'Vector databases for storing and querying embeddings efficiently',
      'Data lakes and the modern data stack: dbt, Delta Lake, Iceberg',
      'Streaming data with Kafka: real-time feature engineering for online ML',
      'Data quality: Great Expectations for automated data validation'
    ],
    prerequisites: 'Data Science, MLOps',
    task: 'Build a complete data pipeline for a recommendation system: ingest user events from Kafka, process with Spark Structured Streaming, compute user and item features with a daily Airflow DAG, store embeddings in Qdrant, and serve recommendations via FastAPI. Include data quality checks with Great Expectations.',
    youtubeQuery: 'data engineering SQL Spark Airflow vector database tutorial 2024',
    docsUrl: 'https://airflow.apache.org/docs/apache-airflow/stable/'
  },
  {
    id: 'sql-databases',
    label: 'SQL & Databases',
    section: 10,
    sectionTitle: 'Data Engineering',
    isMain: false,
    parent: 'data-engineering',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '2 weeks',
    whyMatters: 'Most structured business data lives in relational databases, and querying it effectively is a core data skill. SQL window functions, CTEs, and optimisation (indexes, query plans) are tested in almost every data scientist and ML engineer interview. dbt brings software engineering practices (version control, testing, documentation) to SQL transformations.',
    learn: [
      'SQL fundamentals: SELECT, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT',
      'Joins: INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF joins',
      'Subqueries, CTEs (WITH clause), and when to use each',
      'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, PARTITION BY',
      'Aggregation: COUNT, SUM, AVG, MIN, MAX, PERCENTILE_CONT',
      'Query optimisation: EXPLAIN ANALYZE, index types (B-tree, hash), query rewrites',
      'dbt: writing SQL models with tests, documentation, and incremental materialisation'
    ],
    prerequisites: 'Data Science',
    task: 'Using the Stack Overflow public dataset on BigQuery: write 10 complex SQL queries (including 3 window functions, 2 CTEs, and correlated subqueries) to answer business questions about user engagement, tag trends, and answer quality. Use EXPLAIN ANALYZE to optimise the slowest query by adding an appropriate index.',
    youtubeQuery: 'SQL window functions CTEs advanced tutorial data engineering 2024',
    docsUrl: 'https://docs.getdbt.com/docs/introduction'
  },
  {
    id: 'apache-spark',
    label: 'Apache Spark',
    section: 10,
    sectionTitle: 'Data Engineering',
    isMain: false,
    parent: 'data-engineering',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '2 weeks',
    whyMatters: 'When your data is too large for pandas (>10GB), you need distributed computing. Apache Spark processes data across clusters of machines, handling petabyte-scale datasets. PySpark\'s DataFrame API is similar to pandas, making the transition manageable. Spark is used for feature engineering at scale, cleaning large training datasets, and computing embeddings for millions of items.',
    learn: [
      'Spark architecture: driver, executors, RDDs, DataFrames, Datasets',
      'PySpark DataFrame API: select, filter, groupBy, join, withColumn',
      'Lazy evaluation: transformations vs actions and why Spark waits to execute',
      'Partitioning: how data is distributed, repartition vs coalesce',
      'Spark SQL: writing SQL queries against DataFrames',
      'Spark MLlib: scalable ML algorithms (logistic regression, decision trees, ALS)',
      'Spark Structured Streaming: processing real-time data streams with the DataFrame API'
    ],
    prerequisites: 'SQL & Databases, Python Foundations',
    task: 'Process the Wikipedia page view dataset (available on the Spark documentation website as a learning example) using PySpark: load, clean, compute hourly and daily aggregations, identify top-100 articles per language per day, join with article metadata, and output partitioned Parquet files. Profile query execution plans and optimise using cache() and repartition().',
    youtubeQuery: 'Apache Spark PySpark tutorial data engineering 2024 DataFrame',
    docsUrl: 'https://spark.apache.org/docs/latest/api/python/getting_started/index.html'
  },
  {
    id: 'airflow',
    label: 'Airflow & Pipelines',
    section: 10,
    sectionTitle: 'Data Engineering',
    isMain: false,
    parent: 'data-engineering',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '1–2 weeks',
    whyMatters: 'Data pipelines need to run reliably, on schedule, and with automatic retries when they fail. Apache Airflow is the industry standard for orchestrating these workflows. Every major data engineering team uses a workflow orchestrator. Understanding DAGs, operators, and dependency management is the key to building maintainable pipelines that don\'t require babysitting at 3am.',
    learn: [
      'Airflow concepts: DAG, tasks, operators, sensors, connections, variables',
      'Task dependencies: set_upstream / set_downstream, the >> operator',
      'BashOperator, PythonOperator, DockerOperator, KubernetesPodOperator',
      'Sensors: FileSensor, HttpSensor — waiting for external conditions',
      'XCom: passing small data between tasks in a DAG',
      'Airflow connections and secrets: managing credentials securely',
      'Astronomer/Astro CLI for local Airflow development with Docker'
    ],
    prerequisites: 'Docker & Containers',
    task: 'Build a daily ML retraining pipeline in Airflow: (1) extract new data from a database, (2) validate data quality with Great Expectations, (3) retrain model if validation passes, (4) evaluate against production baseline, (5) update model registry if performance improves. Implement email alerting on any task failure.',
    youtubeQuery: 'Apache Airflow tutorial 2024 DAG pipeline orchestration Python',
    docsUrl: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html'
  },
  {
    id: 'vector-databases',
    label: 'Vector Databases',
    section: 10,
    sectionTitle: 'Data Engineering',
    isMain: false,
    parent: 'data-engineering',
    border: 'purple',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Vector databases are the backbone of RAG systems, semantic search engines, and recommendation systems. They enable fast approximate nearest-neighbour search over millions of high-dimensional embeddings. With the explosion of LLM applications, vector databases have become one of the hottest technologies in the AI stack — and understanding the trade-offs between different implementations is a production engineering skill.',
    learn: [
      'Approximate Nearest Neighbour (ANN): HNSW, IVF, FAISS index types',
      'Embedding storage: dimensions, dtypes (float32 vs int8 quantisation)',
      'FAISS: Meta\'s open-source library for billion-scale vector search',
      'Chroma: the easiest vector DB for local development and prototyping',
      'Pinecone: managed vector DB with metadata filtering and hybrid search',
      'Qdrant: open-source vector DB with payload filtering and Rust performance',
      'Weaviate: vector DB with GraphQL API and built-in vectorisation'
    ],
    prerequisites: 'Hugging Face',
    task: 'Build a semantic search engine over Stack Overflow questions: embed 500K questions with a sentence-transformer model, index in Qdrant with payload metadata (tags, score, date), implement semantic + keyword hybrid search, benchmark query latency vs FAISS flat index, and build a simple Streamlit UI.',
    youtubeQuery: 'vector database tutorial Chroma Pinecone Qdrant FAISS embeddings 2024',
    docsUrl: 'https://qdrant.tech/documentation/'
  },
  {
    id: 'data-lakes',
    label: 'Data Lakes',
    section: 10,
    sectionTitle: 'Data Engineering',
    isMain: false,
    parent: 'data-engineering',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Large ML training datasets are typically stored in data lakes — object storage (S3, GCS) with open table formats like Delta Lake, Apache Iceberg, or Apache Hudi. These formats provide ACID transactions, time travel (reverting to a previous version), and schema evolution on petabyte-scale datasets. Modern ML training at companies like Meta and Google reads directly from data lakes.',
    learn: [
      'Data lake architecture: raw zone → processed zone → curated zone',
      'Parquet format: columnar storage, compression, predicate pushdown',
      'Delta Lake: ACID transactions, time travel, schema enforcement on data lakes',
      'Apache Iceberg: partition evolution, hidden partitioning, catalog integration',
      'dbt on data lakes: transforming raw data into ML-ready features with version control',
      'Data catalogue: tracking lineage, discoverability with tools like OpenMetadata',
      'Cost optimisation: partitioning strategies, file size optimisation, lifecycle policies'
    ],
    prerequisites: 'Apache Spark, SQL & Databases',
    task: 'Build a medallion architecture on AWS S3: bronze layer (raw Parquet), silver layer (cleaned Delta Lake with schema enforcement), gold layer (ML-ready feature table with daily partitioning). Use Spark to write each layer, implement time travel to roll back a bad batch, and track data lineage with a simple OpenMetadata setup.',
    youtubeQuery: 'data lake Delta Lake Iceberg medallion architecture tutorial 2024',
    docsUrl: 'https://delta.io/learn/tutorials/'
  },

  // ─────────────────────────────────────────────
  // SECTION 11 — SPECIALISATIONS
  // ─────────────────────────────────────────────
  {
    id: 'specialisations',
    label: 'Pick a Specialisation',
    section: 11,
    sectionTitle: 'Specialisations',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'ADVANCED',
    time: '8–12 weeks',
    whyMatters: 'Generalist ML knowledge gets you interviews. Deep specialisation gets you the job and the salary. The AI field has diverged into distinct career tracks: NLP/LLM engineers, computer vision engineers, ML platform engineers, and AI researchers. Each requires different depth in different areas. Choosing your specialisation and doubling down on it is the most important career decision you will make in your AI journey.',
    learn: [
      'NLP Engineer: LLMs, fine-tuning, RAG, production language AI systems',
      'Computer Vision Engineer: detection, segmentation, generative vision models',
      'ML Engineer: MLOps, pipelines, serving infrastructure, platform work',
      'Data Scientist: statistical analysis, experimentation, business insight generation',
      'AI Researcher: novel architectures, papers, RLHF, alignment',
      'How to evaluate which specialisation fits your interests and career goals',
      'Building a portfolio that demonstrates depth in your chosen track'
    ],
    prerequisites: 'Deep Learning, NLP & Transformers, Computer Vision, MLOps',
    task: 'Choose your specialisation and complete one capstone project that demonstrates real depth: (1) NLP: build and deploy a production RAG chatbot, (2) CV: compete on a Kaggle CV competition and finish top 20%, (3) ML Eng: build a complete MLOps platform from scratch, (4) Research: reproduce a recent paper and write a blog post on your findings.',
    youtubeQuery: 'AI ML career paths specialisation NLP computer vision MLOps 2024',
    docsUrl: 'https://roadmap.sh/ai-data-scientist'
  },
  {
    id: 'nlp-engineer',
    label: 'NLP Engineer',
    section: 11,
    sectionTitle: 'Specialisations',
    isMain: false,
    parent: 'specialisations',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '8 weeks',
    whyMatters: 'NLP engineers are the most in-demand AI specialists in 2024, driven by the LLM revolution. They build the systems that power chatbots, search engines, content generation tools, and code assistants. Every company building on top of GPT-4, Claude, or Gemini needs NLP engineers who understand prompting, RAG, fine-tuning, and evaluation. Starting salaries are £70k–£120k+ in the UK.',
    learn: [
      'Advanced fine-tuning: RLHF, DPO, PPO for preference alignment',
      'Evaluation: LLM benchmarks (MMLU, HumanEval, MT-Bench), LLM-as-judge',
      'Production RAG: query expansion, re-ranking, hybrid search, citation generation',
      'LLMOps: monitoring hallucination rate, response quality, latency in production',
      'Prompt engineering: chain-of-thought, few-shot, structured outputs, constitutional AI',
      'LLM inference optimisation: vLLM, TGI, quantisation (GGUF, GPTQ, AWQ)',
      'Multimodal LLMs: vision-language models (LLaVA, GPT-4V) and their use cases'
    ],
    prerequisites: 'NLP & Transformers, AI Agents',
    task: 'Build a complete enterprise RAG system: ingest 1,000 company documents with smart chunking, embed with text-embedding-3-large, store in Qdrant, implement query rewriting, hybrid retrieval, MMR-based deduplication, and cross-encoder reranking. Evaluate with RAGAS and achieve faithfulness >0.85 and answer relevance >0.8.',
    youtubeQuery: 'NLP engineer career path LLM fine-tuning RAG production 2024',
    docsUrl: 'https://huggingface.co/docs/trl/index'
  },
  {
    id: 'cv-engineer',
    label: 'Computer Vision Engineer',
    section: 11,
    sectionTitle: 'Specialisations',
    isMain: false,
    parent: 'specialisations',
    border: 'purple',
    difficulty: 'ADVANCED',
    time: '8 weeks',
    whyMatters: 'Computer vision engineers build the systems that power autonomous vehicles, medical diagnostics, retail analytics, and quality control. Despite LLMs dominating headlines, CV is the most widely deployed form of AI in physical products. YOLO models run on edge devices, segmentation powers surgical robotics, and depth estimation enables AR/VR. CV engineers with deployment experience are consistently highly compensated.',
    learn: [
      'Vision Transformers (ViT): patch embeddings, class token, positional encoding',
      'CLIP and multimodal vision-language models for zero-shot classification',
      'Advanced detection: DINO, Grounding DINO, SAM for zero/few-shot tasks',
      'Video understanding: optical flow, 3D convolutions, video transformers',
      'Edge deployment: ONNX export, TensorRT, INT8 quantisation for production',
      'Medical imaging: handling DICOM data, class imbalance, 3D volumes',
      'Annotation tools: Label Studio, Roboflow for building custom datasets'
    ],
    prerequisites: 'Computer Vision, MLOps',
    task: 'Build a production-grade quality inspection system: train a custom YOLO model on synthetic + real defect images, implement active learning to select the 10% most informative unlabelled samples for annotation, export to TensorRT, and deploy as a REST API that processes images in <30ms. Achieve mAP@0.5 >90%.',
    youtubeQuery: 'computer vision engineer career path ViT CLIP deployment 2024',
    docsUrl: 'https://docs.ultralytics.com/tasks/'
  },
  {
    id: 'ml-engineer',
    label: 'ML Engineer',
    section: 11,
    sectionTitle: 'Specialisations',
    isMain: false,
    parent: 'specialisations',
    border: 'orange',
    difficulty: 'ADVANCED',
    time: '8 weeks',
    whyMatters: 'ML engineers build the platforms and infrastructure that allow data scientists to iterate 10x faster. They own feature stores, model registries, training pipelines, and serving infrastructure. At scale-up companies and big tech, ML engineers are among the best-paid engineers — responsible for systems that directly impact revenue. This specialisation suits engineers who enjoy infrastructure, reliability, and enabling others.',
    learn: [
      'Feature stores: Feast, Tecton, Vertex AI Feature Store for serving features in real-time',
      'Online vs offline features: batch computed vs streaming computed feature types',
      'Model registry: managing versioned model artifacts, A/B testing, canary deployments',
      'Kubernetes for ML: Kubeflow Pipelines, KServe for model serving at scale',
      'Training infrastructure: distributed training with PyTorch DDP and FSDP',
      'LLM inference optimisation: vLLM, TensorRT-LLM, speculative decoding',
      'Platform observability: end-to-end lineage, SLAs, on-call culture'
    ],
    prerequisites: 'MLOps, Data Engineering',
    task: 'Build an ML platform from scratch: implement a feature store with online (Redis) and offline (Parquet) storage, a model registry with versioning and promotion workflows, a training pipeline with distributed training support, an A/B testing framework for model evaluation, and a Grafana dashboard. Write a 1,000-word design doc.',
    youtubeQuery: 'ML engineer platform feature store Kubernetes MLOps career 2024',
    docsUrl: 'https://feast.dev/docs/'
  },
  {
    id: 'ai-research',
    label: 'AI Research',
    section: 11,
    sectionTitle: 'Specialisations',
    isMain: false,
    parent: 'specialisations',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '12 weeks',
    whyMatters: 'AI researchers push the boundary of what AI can do. They publish papers, develop new architectures, and create the techniques that practitioners apply years later. A research career requires strong mathematical foundations, the ability to implement and reproduce papers, and the creativity to ask novel questions. Research roles at DeepMind, OpenAI, and Anthropic are among the most prestigious in the field.',
    learn: [
      'Reading papers effectively: abstract, introduction, related work, methodology',
      'Reproducing papers: implementing experiments from scratch to verify results',
      'Arxiv: staying current with preprints, using Connected Papers for discovery',
      'RLHF (Reinforcement Learning from Human Feedback): the technology behind ChatGPT',
      'Mechanistic interpretability: understanding what circuits in neural networks compute',
      'Scaling laws: Chinchilla optimal compute-to-data ratio, emergent abilities',
      'Writing papers: LaTeX, structuring a research contribution, the review process'
    ],
    prerequisites: 'Deep Learning, NLP & Transformers, Mathematics for AI',
    task: 'Choose a recent Arxiv paper with public code. Reproduce its main result from scratch — do not copy the existing implementation. Write a blog post documenting what you learned, what was unclear in the paper, and what you found surprising. Submit to a workshop or short paper track at a major conference (NeurIPS, ICLR, ICML).',
    youtubeQuery: 'AI research career how to read papers reproduce results RLHF 2024',
    docsUrl: 'https://arxiv.org/list/cs.AI/recent'
  },
  {
    id: 'data-scientist',
    label: 'Data Scientist',
    section: 11,
    sectionTitle: 'Specialisations',
    isMain: false,
    parent: 'specialisations',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '6 weeks',
    whyMatters: 'Data scientists are the bridge between data and business decisions. Unlike ML engineers who build systems, data scientists focus on extracting insights, running experiments, and making recommendations. Companies use data scientists for A/B testing, causal inference, customer segmentation, and forecasting. This is often the most accessible entry point into AI because it emphasises analytical skills over engineering.',
    learn: [
      'A/B testing: hypothesis formulation, sample size calculation, MDE, Bonferroni correction',
      'Causal inference: difference-in-differences, instrumental variables, propensity score matching',
      'Time series forecasting: ARIMA, Prophet, NeuralForecast for business forecasting',
      'Survival analysis: churn modelling with Kaplan-Meier, Cox proportional hazards',
      'Business metric design: guardrail metrics, OECs, avoiding Goodhart\'s Law',
      'Communicating results: executive presentations, uncertainty quantification',
      'Python + SQL for analytics: combining pandas, SQL, and visualisation into reports'
    ],
    prerequisites: 'Machine Learning, Data Science',
    task: 'Run a complete A/B test analysis on a simulated e-commerce experiment: (1) validate the experiment design for statistical power, (2) check for sample ratio mismatch, (3) run t-test and Mann-Whitney, (4) check for novelty effect with time-sliced analysis, (5) write an executive summary with a recommendation. Use real data from Microsoft\'s Exp Platform dataset.',
    youtubeQuery: 'data scientist career path A/B testing causal inference analytics 2024',
    docsUrl: 'https://facebook.github.io/prophet/docs/quick_start.html'
  },

  // ─────────────────────────────────────────────
  // SECTION 12 — TOOLS & ECOSYSTEM
  // ─────────────────────────────────────────────
  {
    id: 'tools-ecosystem',
    label: 'Tools & Ecosystem',
    section: 12,
    sectionTitle: 'Tools & Ecosystem',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'BEGINNER',
    time: '2–3 weeks',
    whyMatters: 'Technical skills alone do not make an effective engineer. Mastery of development tools — Git for collaboration, Jupyter for exploration, VS Code for editing, Linux for server work — multiplies your productivity. AI engineers work on teams, use cloud servers, and need to move fast without breaking things. These tools are the infrastructure of professional software development.',
    learn: [
      'Git and GitHub: version control for both code and experiment management',
      'Jupyter: interactive notebooks for exploration, but know when to move to scripts',
      'VS Code and Cursor: features that make Python and ML development productive',
      'Linux: the OS of every ML server, Docker container, and cloud instance',
      'REST API design: thinking about interfaces for your ML services',
      'The ML tooling landscape: which tools are worth learning now vs later',
      'Dotfiles and developer environment setup for productive ML work'
    ],
    prerequisites: 'Python Foundations',
    task: 'Set up a complete professional development environment: install oh-my-zsh, configure VS Code with Python, Pylance, and GitHub Copilot, set up pre-commit hooks (black, isort, mypy, pytest), configure a .devcontainer for reproducible development, and push to a template GitHub repo for reuse on future projects.',
    youtubeQuery: 'developer environment setup Python ML VS Code Git Linux tools 2024',
    docsUrl: 'https://docs.github.com/en/get-started'
  },
  {
    id: 'git-github',
    label: 'Git & GitHub',
    section: 12,
    sectionTitle: 'Tools & Ecosystem',
    isMain: false,
    parent: 'tools-ecosystem',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '1 week',
    whyMatters: 'Git is not optional. Every professional project uses version control, and every team uses GitHub or GitLab for collaboration. A clean, well-maintained GitHub profile is one of the most important parts of an AI/ML portfolio — employers look at it before interviews. Understanding Git also prevents the most common beginner catastrophe: accidentally deleting weeks of work.',
    learn: [
      'Core concepts: commit, branch, merge, rebase, stash, reset',
      'GitHub flow: branch → PR → code review → merge — the professional workflow',
      'Resolving merge conflicts: using git mergetool and understanding conflict markers',
      'Git for ML: tagging model releases, branching by experiment, writing useful commit messages',
      'GitHub Actions: automated workflows on push, PR, or schedule',
      '.gitignore: excluding data files, model checkpoints, __pycache__, .env files',
      'DVC: Data Version Control for tracking large datasets and model files with Git'
    ],
    prerequisites: 'None',
    task: 'Recreate the git history of a public ML project from scratch: clone a repo, wipe the history, rebuild it commit-by-commit with meaningful messages, use feature branches for different components, open PRs to merge them, tag version 1.0.0, and write a README. Verify your history is clean and readable with git log --oneline --graph.',
    youtubeQuery: 'Git GitHub tutorial complete guide branch merge DVC ML 2024',
    docsUrl: 'https://git-scm.com/doc'
  },
  {
    id: 'jupyter',
    label: 'Jupyter & Notebooks',
    section: 12,
    sectionTitle: 'Tools & Ecosystem',
    isMain: false,
    parent: 'tools-ecosystem',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'Jupyter notebooks are the primary tool for exploratory data analysis and rapid prototyping in ML. Understanding when to use notebooks (exploration) vs scripts (production) and how to make notebooks reproducible prevents the chaos of unordered cells and hidden state. JupyterLab extensions and Google Colab for free GPU access are essential for resource-constrained learners.',
    learn: [
      'JupyterLab vs classic Jupyter Notebook: extensions, variable inspector, debugger',
      'Kernel management: restarting, selecting environments, ipython magic commands (%time, %%timeit)',
      'nbconvert: exporting notebooks to HTML, PDF, and Python scripts',
      'Best practices: restart and run all before committing, numbered cell order',
      'Google Colab: free T4 GPU, mounting Google Drive, using secrets',
      'Papermill: parameterised notebook execution for automated reporting',
      'VS Code notebooks: running Jupyter cells directly in VS Code with full IDE features'
    ],
    prerequisites: 'Python Foundations',
    task: 'Build a reproducible EDA notebook: use nbconvert to export to HTML, add papermill parameters to make the dataset path configurable, verify it runs correctly from a clean environment with "Restart and Run All", and set up a pre-commit hook that automatically runs nb-clean to remove output before committing.',
    youtubeQuery: 'Jupyter notebook tutorial JupyterLab Google Colab best practices ML',
    docsUrl: 'https://docs.jupyter.org/en/latest/'
  },
  {
    id: 'vscode-cursor',
    label: 'VS Code & Cursor',
    section: 12,
    sectionTitle: 'Tools & Ecosystem',
    isMain: false,
    parent: 'tools-ecosystem',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'Your editor is your primary tool and optimising it multiplies productivity across your entire career. VS Code with Python extensions (Pylance, debugger, test runner) makes Python development dramatically more productive than a plain text editor. Cursor takes this further by integrating LLM assistance directly into your editing workflow — letting AI help you write, debug, and refactor code.',
    learn: [
      'VS Code Python extension: Pylance type checking, IntelliSense, import organisation',
      'Integrated debugger: setting breakpoints, inspecting variables, step through',
      'Testing integration: running pytest tests directly in the editor with coverage',
      'Remote development: SSH into a cloud GPU server and edit files as if local',
      'Dev containers: .devcontainer for reproducible team development environments',
      'Cursor AI features: Tab completion, Cmd+K for inline edits, Ctrl+Shift+J for chat',
      'Useful extensions: Python, Pylance, GitLens, Thunder Client, Error Lens'
    ],
    prerequisites: 'Python Foundations',
    task: 'Configure VS Code as a professional ML development environment: set up Pylance in strict mode with type checking, configure pytest with coverage, set up black and isort as formatters on save, configure a launch.json for debugging a training script with breakpoints, and connect to a remote GPU server via SSH. Time a debugging session with and without the debugger.',
    youtubeQuery: 'VS Code Python setup Cursor AI editor tutorial 2024 developer',
    docsUrl: 'https://code.visualstudio.com/docs/python/python-tutorial'
  },
  {
    id: 'linux-terminal',
    label: 'Linux & Terminal',
    section: 12,
    sectionTitle: 'Tools & Ecosystem',
    isMain: false,
    parent: 'tools-ecosystem',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Every ML server, Docker container, and cloud instance runs Linux. A practitioner who cannot navigate a Linux terminal cannot access their training jobs, debug GPU issues, or manage running processes. Screen, tmux, and SSH are required for multi-day training runs on remote servers. Understanding process management, file permissions, and bash scripting makes you self-sufficient on any machine.',
    learn: [
      'Navigation: ls, cd, pwd, find, locate, grep for searching files and content',
      'File operations: cp, mv, rm, mkdir, chmod, chown, ln (symlinks)',
      'Process management: ps, top, htop, nvidia-smi, kill, nohup, &',
      'Tmux: persistent sessions that survive SSH disconnections during training',
      'SSH: key-based authentication, ssh config for aliases, SCP for file transfer',
      'Bash scripting: variables, loops, conditionals, cron jobs for automation',
      'Package management: apt, pip, conda — when to use each, avoiding conflicts'
    ],
    prerequisites: 'None',
    task: 'Write a bash training manager script: it SSHs to a remote GPU server, starts a tmux session with a training run, monitors GPU utilisation with nvidia-smi every 5 minutes and logs it, sends a local notification when training completes, downloads the model checkpoint with SCP, and cleans up the remote session. Make it reusable for any training script.',
    youtubeQuery: 'Linux terminal tutorial for data scientists ML engineers SSH tmux 2024',
    docsUrl: 'https://linuxcommand.org/lc3_learning_the_shell.php'
  },
  {
    id: 'api-design',
    label: 'API Design',
    section: 12,
    sectionTitle: 'Tools & Ecosystem',
    isMain: false,
    parent: 'tools-ecosystem',
    border: 'blue',
    difficulty: 'INTERMEDIATE',
    time: '3–4 days',
    whyMatters: 'ML models are valuable only when they are accessible. Every production ML system exposes its predictions through an API. Understanding REST principles, versioning, authentication, and rate limiting lets you build APIs that are reliable, secure, and maintainable. OpenAPI/Swagger documentation means other engineers can integrate with your model without asking you how it works.',
    learn: [
      'REST principles: resources, HTTP methods, status codes, idempotency',
      'API versioning: URL versioning (/v1/), header versioning, deprecation strategy',
      'Request validation: Pydantic models for strict input validation, error responses',
      'Authentication: API keys vs OAuth 2.0 vs JWT — choosing the right approach',
      'Rate limiting: sliding window algorithm, token bucket, implementing with Redis',
      'OpenAPI/Swagger: auto-generated documentation from FastAPI type hints',
      'Streaming responses: Server-Sent Events (SSE) for LLM token streaming'
    ],
    prerequisites: 'Model Serving — FastAPI',
    task: 'Redesign your ML serving API with production-grade API design: add versioning, implement JWT auth with refresh tokens, add Redis-based rate limiting (100 req/min per API key), write OpenAPI documentation with examples, implement SSE streaming for LLM responses, and write a comprehensive test suite covering authentication, validation, and error cases.',
    youtubeQuery: 'REST API design best practices FastAPI versioning authentication 2024',
    docsUrl: 'https://fastapi.tiangolo.com/tutorial/'
  },

  // ─────────────────────────────────────────────
  // SECTION 13 — AI SAFETY & ETHICS
  // ─────────────────────────────────────────────
  {
    id: 'ai-safety-ethics',
    label: 'AI Safety & Ethics',
    section: 13,
    sectionTitle: 'AI Safety & Ethics',
    isMain: true,
    parent: null,
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '2–3 weeks',
    whyMatters: 'AI systems have caused real harm: biased hiring tools, racially unequal facial recognition, and recommendation systems amplifying misinformation. Understanding the technical and ethical dimensions of these failures is both a professional responsibility and increasingly a legal requirement. EU AI Act, GDPR, and corporate AI governance frameworks require practitioners to understand fairness, accountability, and safety.',
    learn: [
      'AI alignment: the challenge of ensuring AI systems pursue intended goals',
      'Types of bias in ML: historical bias, measurement bias, aggregation bias',
      'Fairness metrics: demographic parity, equalised odds, individual fairness',
      'Model cards and datasheets: documenting model limitations and intended use',
      'Privacy-preserving ML: differential privacy, federated learning',
      'Red-teaming: systematically probing models for harmful outputs',
      'EU AI Act: risk classification, transparency requirements, conformity assessments'
    ],
    prerequisites: 'Machine Learning, Deep Learning',
    task: 'Conduct a complete fairness audit of a hiring prediction model on the Adult Income dataset: measure demographic parity, equalised odds, and individual fairness across race and gender. Apply fairness constraints using Fairlearn. Write a model card documenting limitations. Design a red-teaming checklist for your AI system.',
    youtubeQuery: 'AI ethics bias fairness auditing red-teaming tutorial 2024',
    docsUrl: 'https://fairlearn.org/v0.10/user_guide/index.html'
  },
  {
    id: 'alignment-basics',
    label: 'Alignment Basics',
    section: 13,
    sectionTitle: 'AI Safety & Ethics',
    isMain: false,
    parent: 'ai-safety-ethics',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'AI alignment is the field studying how to build AI systems that reliably pursue intended goals. As models become more capable, ensuring they behave as intended becomes more critical and harder. Understanding the spectrum from near-term harms (biased outputs) to longer-term concerns (goal misspecification at scale) is intellectually important for any AI practitioner building systems that affect people.',
    learn: [
      'The alignment problem: why specifying objectives correctly is hard',
      'Goodhart\'s Law: when a measure becomes a target, it ceases to be a good measure',
      'RLHF: Reinforcement Learning from Human Feedback — how ChatGPT was aligned',
      'Constitutional AI: Anthropic\'s approach to rule-based RLHF without human labels',
      'Scalable oversight: how to supervise AI systems more capable than their supervisors',
      'Mechanistic interpretability: understanding what computations circuits implement',
      'Current alignment research orgs: Anthropic, ARC, MIRI, DeepMind Safety'
    ],
    prerequisites: 'Deep Learning',
    task: 'Implement a simplified RLHF pipeline: fine-tune a small language model with a reward model trained on preference data. Use the TRL library\'s RewardTrainer and PPOTrainer. Evaluate whether the aligned model follows instructions better than the base model on a hand-curated test set. Write a 500-word reflection on what alignment solved and what it did not.',
    youtubeQuery: 'AI alignment RLHF Constitutional AI tutorial Anthropic safety 2024',
    docsUrl: 'https://huggingface.co/docs/trl/reward_trainer'
  },
  {
    id: 'bias-fairness',
    label: 'Bias & Fairness',
    section: 13,
    sectionTitle: 'AI Safety & Ethics',
    isMain: false,
    parent: 'ai-safety-ethics',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Biased AI systems have caused documented harm: Amazon\'s recruiting tool penalised women, COMPAS recidivism scores showed racial disparities, facial recognition failed disproportionately on dark-skinned faces. Understanding the technical sources of bias and the fairness metrics used to detect it is a professional responsibility for anyone building systems that make decisions affecting people.',
    learn: [
      'Sources of bias: training data, labelling, proxy features, feedback loops',
      'Fairness definitions: demographic parity, equalised odds, calibration — and why they conflict',
      'Intersectionality: why evaluating on age and gender separately misses age × gender effects',
      'Fairlearn and AI Fairness 360: open-source toolkits for fairness assessment',
      'Debiasing techniques: reweighting, adversarial debiasing, post-processing',
      'Disparate impact analysis: legal frameworks under GDPR and EU AI Act',
      'The impossibility theorem: why you cannot satisfy all fairness metrics simultaneously'
    ],
    prerequisites: 'Machine Learning',
    task: 'Audit a pretrained face recognition model for demographic bias using the Labeled Faces in the Wild dataset: measure false positive/negative rates across gender and race, visualise disparities, apply AIF360 to mitigate bias with reweighting, and write a bias report in the format required by the EU AI Act high-risk system documentation.',
    youtubeQuery: 'AI bias fairness metrics tutorial Fairlearn AIF360 demographic parity',
    docsUrl: 'https://fairlearn.org/v0.10/user_guide/fairness_in_machine_learning.html'
  },
  {
    id: 'responsible-ai',
    label: 'Responsible AI',
    section: 13,
    sectionTitle: 'AI Safety & Ethics',
    isMain: false,
    parent: 'ai-safety-ethics',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '1 week',
    whyMatters: 'Responsible AI is moving from aspiration to regulation. The EU AI Act classifies AI systems by risk level and imposes binding technical and governance requirements. GDPR\'s right to explanation affects automated decision-making. Companies face legal liability for discriminatory or harmful AI outputs. Understanding these frameworks is no longer just ethics — it is compliance and risk management.',
    learn: [
      'EU AI Act: risk tiers (unacceptable, high, limited, minimal), obligations per tier',
      'GDPR Article 22: rights related to automated decision-making and profiling',
      'Model cards and datasheets for datasets: standardised documentation frameworks',
      'Explainability: LIME and SHAP for local and global model interpretation',
      'Human-in-the-loop: designing systems where humans review high-stakes predictions',
      'Privacy-preserving techniques: differential privacy, federated learning, k-anonymity',
      'Incident response: what to do when your AI system causes harm'
    ],
    prerequisites: 'Bias & Fairness',
    task: 'Write a complete AI system documentation package for a credit scoring model: (1) a model card with intended use, performance metrics across demographic groups, and known limitations; (2) a datasheet for the training dataset; (3) a risk assessment against EU AI Act requirements; (4) an explainability report with SHAP global and local explanations for the 10 most important features.',
    youtubeQuery: 'responsible AI EU AI Act model card SHAP explainability tutorial',
    docsUrl: 'https://www.oecd.org/digital/artificial-intelligence/ai-principles/'
  },
  {
    id: 'red-teaming',
    label: 'Red-teaming',
    section: 13,
    sectionTitle: 'AI Safety & Ethics',
    isMain: false,
    parent: 'ai-safety-ethics',
    border: 'dashed',
    difficulty: 'ADVANCED',
    time: '1 week',
    whyMatters: 'Red-teaming is the adversarial process of probing AI systems for harmful outputs before deployment. LLM red-teaming has revealed jailbreaks, misinformation risks, and bias in every major model. Anthropic, OpenAI, and Google conduct extensive red-teaming before releases. Understanding how to red-team a system — and how to make it more robust — is a skill that will become mandatory for any safety-critical AI deployment.',
    learn: [
      'Red-teaming objectives: identify harmful outputs, jailbreaks, and capability misuse',
      'Attack categories: prompt injection, jailbreaks, roleplay manipulation, context stuffing',
      'Automated red-teaming: using LLMs to generate adversarial prompts at scale',
      'Red-teaming LLMs for misinformation, hate speech, and dangerous information',
      'Structured red-teaming frameworks: Microsoft\'s Pyrit, Garak',
      'Defence techniques: input filtering, output classifiers, system prompt hardening',
      'Responsible disclosure: reporting vulnerabilities to model developers'
    ],
    prerequisites: 'NLP & Transformers, Responsible AI',
    task: 'Red-team an open-source LLM (Llama or Mistral) using Garak and manual techniques: find at least 5 distinct categories of failure (jailbreak, factual hallucination, bias, misinformation, prompt injection). Propose and implement a mitigation for the most serious vulnerability. Write a red-team report in the format used by Anthropic\'s public safety documents.',
    youtubeQuery: 'LLM red-teaming jailbreak prompt injection Garak tutorial 2024',
    docsUrl: 'https://github.com/NVIDIA/garak'
  },

  // ─────────────────────────────────────────────
  // SECTION 14 — AI TOOLS FOR DEVS
  // ─────────────────────────────────────────────
  {
    id: 'ai-dev-tools',
    label: 'AI Dev Tools',
    section: 14,
    sectionTitle: 'AI Tools for Devs',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'BEGINNER',
    time: '1–2 weeks',
    whyMatters: 'AI coding tools have become so effective that they are reshaping what it means to be a developer. Engineers using Cursor and GitHub Copilot consistently report 30–50% productivity gains. The ability to use AI tools judiciously — getting the most from them while critically evaluating their output — is now a baseline professional skill. Falling behind on these tools means falling behind in pace of work.',
    learn: [
      'GitHub Copilot: AI pair programming in VS Code, IntelliJ, and other IDEs',
      'Cursor: an AI-native editor with full codebase context and agent capabilities',
      'Claude Code: Anthropic\'s agentic coding tool for complex multi-file refactors',
      'v0 and Bolt: AI-powered UI generation for prototyping',
      'LLM APIs: calling OpenAI, Anthropic, and Gemini directly in your code',
      'Prompt engineering for coding: how to write prompts that produce correct code',
      'Critically evaluating AI-generated code: what to trust and what to verify'
    ],
    prerequisites: 'Python Foundations',
    task: 'Use Cursor (or GitHub Copilot + Claude Code) to build a complete data pipeline in one day that would normally take a week: ingest a public dataset, clean it, engineer features, train a model, build a FastAPI endpoint, write unit tests, and deploy to a cloud platform. Document every AI-assisted step and evaluate where the AI saved the most time.',
    youtubeQuery: 'Cursor AI GitHub Copilot Claude Code productivity tools 2024',
    docsUrl: 'https://cursor.com/docs'
  },
  {
    id: 'github-copilot-ai',
    label: 'GitHub Copilot',
    section: 14,
    sectionTitle: 'AI Tools for Devs',
    isMain: false,
    parent: 'ai-dev-tools',
    border: 'dashed',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'GitHub Copilot is now used by millions of developers and integrated into GitHub itself. It suggests completions for boilerplate, helps write unit tests, explains unfamiliar code, and generates documentation. For ML engineers, Copilot is particularly useful for the repetitive parts of data science work: writing pandas transforms, boilerplate PyTorch training loops, and test fixtures.',
    learn: [
      'Tab completion: accepting, rejecting, and cycling through suggestions',
      'Copilot Chat: asking questions about code, generating explanations, fixing bugs',
      'Writing comments as prompts: // Function that loads a CSV and normalises columns',
      'Using Copilot for test generation: generate unit tests from function signatures',
      'Copilot for documentation: generating docstrings from function implementations',
      'Managing Copilot quality: when suggestions are good vs when they hallucinate',
      'Copilot Enterprise: company codebase context and security filtering'
    ],
    prerequisites: 'Python Foundations',
    task: 'Use GitHub Copilot to 3x your speed on a real task: write a complete pandas EDA pipeline (loading, cleaning, visualising, reporting) with Copilot suggestions. Track how many keystrokes Copilot saved vs typing everything manually. Identify 3 cases where Copilot\'s suggestion was wrong and explain why.',
    youtubeQuery: 'GitHub Copilot tutorial 2024 productivity tips VS Code Python',
    docsUrl: 'https://docs.github.com/en/copilot/getting-started-with-github-copilot'
  },
  {
    id: 'cursor-ai',
    label: 'Cursor',
    section: 14,
    sectionTitle: 'AI Tools for Devs',
    isMain: false,
    parent: 'ai-dev-tools',
    border: 'dashed',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'Cursor represents the next generation of AI-integrated development. Unlike Copilot, which completes lines, Cursor understands your entire codebase and can make multi-file edits, answer questions about any file, and execute multi-step coding tasks as an agent. For ML engineers managing large pipelines, this codebase-level intelligence dramatically reduces the cognitive load of navigating complex projects.',
    learn: [
      'Cmd+K: generate or edit code inline with natural language instructions',
      'Ctrl+Shift+J (Chat): ask questions about your codebase with file references',
      'Cursor Tab: accept multi-line completions that are context-aware',
      '@-mentions: referencing specific files, functions, or symbols in prompts',
      'Cursor Composer/Agent: give complex multi-file tasks to the agent mode',
      '.cursorrules: project-specific instructions that guide Cursor\'s behaviour',
      'Model selection: when to use claude-4-sonnet vs claude-opus for different tasks'
    ],
    prerequisites: 'Python Foundations',
    task: 'Use Cursor to refactor a messy ML project: add type hints to all functions, convert a Jupyter notebook to a modular Python package with separate modules for data loading, preprocessing, training, and evaluation, write docstrings for every public function, and add a full test suite with pytest. Use only Cursor AI features — no manual typing of new code.',
    youtubeQuery: 'Cursor AI editor tutorial 2024 complete guide codebase agent mode',
    docsUrl: 'https://cursor.com/docs'
  },
  {
    id: 'claude-code-ai',
    label: 'Claude Code',
    section: 14,
    sectionTitle: 'AI Tools for Devs',
    isMain: false,
    parent: 'ai-dev-tools',
    border: 'dashed',
    difficulty: 'INTERMEDIATE',
    time: '2–3 days',
    whyMatters: 'Claude Code is Anthropic\'s agentic coding CLI that lives in your terminal. It can read your entire codebase, plan complex multi-step tasks, write and run code, interpret test results, and iterate autonomously. For ML engineers, it excels at large-scale refactoring, migrating codebases to new APIs, and implementing features that span many files. It is complementary to Cursor for different task types.',
    learn: [
      'Installing Claude Code via npm and authenticating with Anthropic API',
      'Giving permission: approving file reads, writes, and command execution',
      'Describing multi-step tasks in natural language for autonomous execution',
      'CLAUDE.md: the project context file Claude reads at the start of every session',
      'Agentic loops: Claude Code running tests, seeing failures, and fixing them',
      'Reviewing changes with git diff before committing AI-generated code',
      'When to use Claude Code vs Cursor: terminal-heavy tasks vs IDE-heavy tasks'
    ],
    prerequisites: 'Python Foundations, Git & GitHub',
    task: 'Give Claude Code a complex ML task: "Migrate this project from TensorFlow 2.x to PyTorch, update all tests, update the Dockerfile, and update the README." Review every file change with git diff, verify all tests pass, and measure how long the migration took vs an estimate of doing it manually. Document any mistakes Claude made.',
    youtubeQuery: 'Claude Code agentic coding tutorial terminal 2024 Anthropic',
    docsUrl: 'https://docs.anthropic.com/en/docs/claude-code'
  },
  {
    id: 'v0-bolt',
    label: 'v0 & Bolt',
    section: 14,
    sectionTitle: 'AI Tools for Devs',
    isMain: false,
    parent: 'ai-dev-tools',
    border: 'dashed',
    difficulty: 'BEGINNER',
    time: '2 days',
    whyMatters: 'v0 by Vercel and Bolt are generative UI tools that produce full-stack web interfaces from prompts or screenshots. For ML practitioners, they are invaluable for rapidly prototyping dashboards, model demos, and data visualisation UIs that would otherwise require weeks of frontend work. Being able to ship a polished Streamlit alternative in hours makes your ML projects more demonstrable and hirable.',
    learn: [
      'Prompting v0 effectively: describing layouts, interactions, and data schemas precisely',
      'Iterating on generated UI with follow-up prompts: "make the table sortable"',
      'Bolt for full-stack apps: generating React + backend from a single prompt',
      'Exporting v0 components to your existing Next.js project',
      'When AI-generated UI shines: dashboards, admin panels, prototype demos',
      'When it falls short: complex custom animations, highly specific brand designs',
      'Critically reviewing generated code: what to keep, what to rewrite'
    ],
    prerequisites: 'Python Foundations',
    task: 'Build a model monitoring dashboard in 2 hours using v0 and bolt: design a prompt describing your dashboard (model metrics over time, feature drift charts, prediction volume, latency histogram), generate with v0, copy to a Next.js project, connect to your FastAPI backend, and deploy on Vercel. Compare the actual time taken vs an estimate of building it from scratch.',
    youtubeQuery: 'v0 Vercel Bolt tutorial 2024 AI UI generation dashboard prototyping',
    docsUrl: 'https://v0.dev'
  },
  {
    id: 'llm-apis',
    label: 'LLM APIs',
    section: 14,
    sectionTitle: 'AI Tools for Devs',
    isMain: false,
    parent: 'ai-dev-tools',
    border: 'blue',
    difficulty: 'BEGINNER',
    time: '3 days',
    whyMatters: 'LLM APIs are the foundation of the modern AI application stack. OpenAI, Anthropic, and Google provide REST APIs that let you add language intelligence to any application in minutes. Understanding how to use these APIs efficiently — caching, streaming, structured outputs, function calling — is a prerequisite for building any AI-powered product or feature.',
    learn: [
      'OpenAI API: chat completions, embeddings, vision, audio endpoints',
      'Anthropic API: Claude messages endpoint, system prompts, vision, tool use',
      'Streaming responses: processing token chunks as they arrive for UX responsiveness',
      'Structured outputs: forcing JSON responses matching a schema with response_format',
      'Token counting: tiktoken for estimating cost before sending requests',
      'Caching strategies: semantic caching with Redis to reduce API costs 60–80%',
      'API router pattern: OpenRouter, LiteLLM for multi-provider fallback and cost routing'
    ],
    prerequisites: 'Python Foundations',
    task: 'Build an LLM-powered document analyser: accept PDFs, extract text, chunk intelligently, call the Anthropic API with vision for image pages, stream the response to the user, implement semantic caching with Redis to avoid re-processing identical queries, and add a cost tracker that logs token usage per request to a database.',
    youtubeQuery: 'LLM API tutorial OpenAI Anthropic Claude streaming structured outputs 2024',
    docsUrl: 'https://docs.anthropic.com/en/api/getting-started'
  },

  // ─────────────────────────────────────────────
  // FINAL NODE — CONGRATULATIONS
  // ─────────────────────────────────────────────
  {
    id: 'ai-congrats',
    label: '🎉 AI/ML Engineer',
    section: 15,
    sectionTitle: 'Job Ready',
    isMain: true,
    parent: null,
    border: 'green',
    difficulty: 'BEGINNER',
    time: 'You made it',
    special: true,
    whyMatters: 'Congratulations — you have completed one of the most comprehensive AI/ML roadmaps available. From Python fundamentals to transformer architectures, from MLOps pipelines to multi-agent systems, you now have the skills that professional AI engineers use every day. The field moves fast, but the foundations you\'ve built are durable. Every new model, framework, and technique you encounter will feel familiar because you understand the principles behind them. Go build something that matters — an AI product, an open-source tool, or your first published research. The world needs engineers who can bridge the gap between AI research and real-world impact. That is you now.',
    learn: [
      'Deploy a complete AI product: RAG chatbot, CV system, or ML-powered API',
      'Contribute to an open-source ML project (Hugging Face, LangChain, PyTorch)',
      'Write a technical blog post or paper on something you found difficult or novel',
      'Reproduce a recent Arxiv paper and document your findings publicly',
      'Build a Kaggle competition submission in your specialisation (target top 20%)',
      'Set up a GitHub profile that showcases your best ML projects with clear READMEs',
      'Apply for your first ML/AI role: target 5 applications per day'
    ],
    prerequisites: 'Everything on this roadmap',
    task: 'Apply for your first ML role or publish your first AI project on GitHub and Hugging Face. Your portfolio should include: one end-to-end ML system with MLOps, one LLM application demonstrating RAG or fine-tuning, and one domain-specific project (CV or NLP). Each must be deployed publicly and documented thoroughly.',
    youtubeQuery: 'how to get first ML AI job 2024 portfolio machine learning engineer',
    docsUrl: 'https://roadmap.sh/ai-data-scientist'
  }

]; // end AI_RM_NODES


// ─────────────────────────────────────────────────────────────
// § 2 — PROGRESS STATE
// ─────────────────────────────────────────────────────────────
let aiRmProgress = JSON.parse(localStorage.getItem('ai_visual_progress') || '{}');
const aiRmSaveProgress = () => localStorage.setItem('ai_visual_progress', JSON.stringify(aiRmProgress));

// ─────────────────────────────────────────────────────────────
// § 3 — EXPAND STATE  (all sections expanded by default)
// ─────────────────────────────────────────────────────────────
let aiRmExpanded = {};


// ─────────────────────────────────────────────────────────────
// § 4 — RENDERING ENGINE
// ─────────────────────────────────────────────────────────────

// ── Border → visual style map ──────────────────────────────────
const AI_RM_BORDER_STYLES = {
  green:  { border: '2px solid #10b981', bg: '#051a10', glow: 'rgba(16,185,129,0.18)',  color: '#10b981' },
  blue:   { border: '2px solid #3b82f6', bg: '#05101a', glow: 'rgba(59,130,246,0.15)',  color: '#3b82f6' },
  purple: { border: '2px solid #a855f7', bg: '#0f0520', glow: 'rgba(168,85,247,0.15)', color: '#a855f7' },
  orange: { border: '2px solid #f97316', bg: '#1a0f05', glow: 'rgba(249,115,22,0.18)', color: '#f97316' },
  dashed: { border: '2px dashed #8080a8', bg: '#0c0c20', glow: 'rgba(128,128,168,0.1)', color: '#8080a8' }
};

const AI_RM_SECTION_TITLES = {
  1:  'Python Foundations',
  2:  'Mathematics for AI',
  3:  'Data Science',
  4:  'Machine Learning',
  5:  'Deep Learning',
  6:  'NLP & Transformers',
  7:  'Computer Vision',
  8:  'AI Agents',
  9:  'MLOps & Production',
  10: 'Data Engineering',
  11: 'Specialisations',
  12: 'Tools & Ecosystem',
  13: 'AI Safety & Ethics',
  14: 'AI Tools for Devs',
  15: 'Job Ready'
};

// ── MAIN RENDER FUNCTION ───────────────────────────────────────
function aiRmRender() {
  const graph = document.getElementById('ai-rm-graph');
  if (!graph) return;

  graph.innerHTML = '';

  const sections = {};
  AI_RM_NODES.forEach(node => {
    if (!sections[node.section]) sections[node.section] = [];
    sections[node.section].push(node);
  });

  const sectionNums = Object.keys(sections).map(Number).sort((a, b) => a - b);

  sectionNums.forEach(sNum => {
    if (aiRmExpanded[sNum] === undefined) aiRmExpanded[sNum] = true;
  });

  const svgLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLayer.setAttribute('class', 'ai-rm-svg-layer');
  svgLayer.setAttribute('id', 'ai-rm-svg-layer');
  graph.appendChild(svgLayer);

  sectionNums.forEach((sNum, idx) => {
    const sectionNodes = sections[sNum];
    const mainNode = sectionNodes.find(n => n.isMain);
    const children = sectionNodes.filter(n => !n.isMain);
    const sectionTitle = mainNode?.sectionTitle || AI_RM_SECTION_TITLES[sNum] || `Section ${sNum}`;

    // Section label (not for final congrats)
    if (sNum !== 15) {
      const labelEl = document.createElement('div');
      labelEl.className = 'ai-rm-section-label';

      const sectionDone = sectionNodes.filter(n => {
        const p = aiRmProgress[n.id];
        return p && p.status === 'done';
      }).length;

      labelEl.innerHTML = `
        <span class="ai-rm-section-num">§${String(sNum).padStart(2,'0')}</span>
        <span class="ai-rm-section-title-text">${sectionTitle.toUpperCase()}</span>
        <span class="ai-rm-section-line"></span>
        <span class="ai-rm-section-mini-prog">${sectionDone}/${sectionNodes.length}</span>
      `;
      graph.appendChild(labelEl);
    }

    // Section block
    const block = document.createElement('div');
    block.className = 'ai-rm-section-block';
    block.id = `ai-rm-section-${sNum}`;

    // Trunk / main node
    if (mainNode) {
      const hasChildren = children.length > 0;
      const trunkEl = aiRmCreateNodeEl(mainNode, true, hasChildren, sNum);
      block.appendChild(trunkEl);
    }

    // Children grid
    if (children.length > 0) {
      const childrenWrap = document.createElement('div');
      childrenWrap.className = 'ai-rm-children-wrap';
      childrenWrap.id = `ai-rm-children-${sNum}`;

      if (!aiRmExpanded[sNum]) {
        childrenWrap.style.display = 'none';
      }

      const leftCol = document.createElement('div');
      leftCol.className = 'ai-rm-child-col ai-rm-child-left';
      const rightCol = document.createElement('div');
      rightCol.className = 'ai-rm-child-col ai-rm-child-right';

      children.forEach((child, i) => {
        const childEl = aiRmCreateNodeEl(child, false, false, sNum);
        if (i % 2 === 0) {
          leftCol.appendChild(childEl);
        } else {
          rightCol.appendChild(childEl);
        }
      });

      childrenWrap.appendChild(leftCol);
      childrenWrap.appendChild(rightCol);
      block.appendChild(childrenWrap);
    }

    graph.appendChild(block);

    // Connector between sections
    if (idx < sectionNums.length - 1) {
      const connector = document.createElement('div');
      connector.className = 'ai-rm-connector-wrap';
      const vLine = document.createElement('div');
      vLine.className = 'ai-rm-v-line';
      vLine.style.height = '28px';
      connector.appendChild(vLine);
      graph.appendChild(connector);
    }
  });

  aiRmApplyProgress();

  requestAnimationFrame(() => {
    aiRmDrawLines();
  });
}

// ── Create a node DOM element ──────────────────────────────────
function aiRmCreateNodeEl(node, isTrunk, hasChildren, sNum) {
  const style = AI_RM_BORDER_STYLES[node.border] || AI_RM_BORDER_STYLES.dashed;

  const el = document.createElement('div');
  el.className = isTrunk ? 'ai-rm-node ai-rm-trunk' : 'ai-rm-node ai-rm-child';
  el.id = `ai-rm-node-${node.id}`;
  el.dataset.nodeId = node.id;
  el.dataset.section = sNum;

  if (node.special) {
    el.classList.add('ai-rm-node-congrats');
  }

  el.style.cssText = `
    background: ${style.bg};
    border: ${style.border};
    box-shadow: 0 0 0 0 ${style.glow};
  `;

  let innerHtml = '';
  innerHtml += `<div class="ai-rm-node-status-badge" id="ai-rm-badge-${node.id}"></div>`;
  innerHtml += `<span class="ai-rm-node-label" style="color: ${isTrunk ? style.color : 'var(--t1)'}">${node.label}</span>`;

  if (isTrunk && node.time && node.time !== 'You made it') {
    innerHtml += `<span class="ai-rm-node-time">${node.time}</span>`;
  }

  if (isTrunk && hasChildren) {
    innerHtml += `<div class="ai-rm-expand-dot" id="ai-rm-exp-${sNum}"></div>`;
  }

  el.innerHTML = innerHtml;

  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isTrunk && hasChildren) {
      aiRmToggleSection(sNum, el);
    } else {
      aiRmOpenSheet(node.id);
    }
  });

  if (isTrunk) {
    let longPressTimer = null;
    el.addEventListener('touchstart', () => {
      longPressTimer = setTimeout(() => {
        aiRmOpenSheet(node.id);
      }, 500);
    }, { passive: true });
    el.addEventListener('touchend', () => clearTimeout(longPressTimer), { passive: true });
    el.addEventListener('touchmove', () => clearTimeout(longPressTimer), { passive: true });
  }

  return el;
}

// ── Toggle section expand/collapse ─────────────────────────────
function aiRmToggleSection(sNum, trunkEl) {
  aiRmExpanded[sNum] = !aiRmExpanded[sNum];
  const childrenWrap = document.getElementById(`ai-rm-children-${sNum}`);
  const expDot = document.getElementById(`ai-rm-exp-${sNum}`);

  if (childrenWrap) {
    if (aiRmExpanded[sNum]) {
      childrenWrap.style.display = 'flex';
      childrenWrap.style.animation = 'ai-rm-fadeIn 0.2s ease';
      if (expDot) expDot.classList.remove('ai-rm-collapsed');
    } else {
      childrenWrap.style.display = 'none';
      if (expDot) expDot.classList.add('ai-rm-collapsed');
    }
  }

  requestAnimationFrame(() => aiRmDrawLines());
}

// ── DRAW SVG CONNECTOR LINES ───────────────────────────────────
function aiRmDrawLines() {
  const graph = document.getElementById('ai-rm-graph');
  const svgLayer = document.getElementById('ai-rm-svg-layer');
  if (!svgLayer || !graph) return;

  const graphRect = graph.getBoundingClientRect();
  const totalHeight = graph.scrollHeight;
  svgLayer.setAttribute('width', graphRect.width);
  svgLayer.setAttribute('height', totalHeight);
  svgLayer.setAttribute('viewBox', `0 0 ${graphRect.width} ${totalHeight}`);

  svgLayer.innerHTML = '';

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <marker id="ai-rm-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill="#2a3a2a"/>
    </marker>
    <marker id="ai-rm-arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill="rgba(16,185,129,0.4)"/>
    </marker>
  `;
  svgLayer.appendChild(defs);

  const getNodePoints = (el) => {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const graphScrollTop = graph.scrollTop;
    const top = rect.top - graphRect.top + graphScrollTop;
    const left = rect.left - graphRect.left;
    const width = rect.width;
    const height = rect.height;
    return {
      top,
      bottom: top + height,
      left,
      right: left + width,
      centerX: left + width / 2,
      centerY: top + height / 2,
      topCenter: { x: left + width / 2, y: top },
      bottomCenter: { x: left + width / 2, y: top + height },
      midLeft: { x: left, y: top + height / 2 },
      midRight: { x: left + width, y: top + height / 2 }
    };
  };

  const makePath = (d, color = '#1a2a1a', dashArray = '') => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('marker-end', 'url(#ai-rm-arrow)');
    if (dashArray) path.setAttribute('stroke-dasharray', dashArray);
    return path;
  };

  const sections = {};
  AI_RM_NODES.forEach(node => {
    if (!sections[node.section]) sections[node.section] = [];
    sections[node.section].push(node);
  });

  const sectionNums = Object.keys(sections).map(Number).sort((a, b) => a - b);

  // Draw vertical spine between trunk nodes
  const trunkEls = sectionNums.map(sNum => {
    const mainNode = sections[sNum].find(n => n.isMain);
    return mainNode ? document.getElementById(`ai-rm-node-${mainNode.id}`) : null;
  }).filter(Boolean);

  for (let i = 0; i < trunkEls.length - 1; i++) {
    const fromPts = getNodePoints(trunkEls[i]);
    const toPts = getNodePoints(trunkEls[i + 1]);
    if (!fromPts || !toPts) continue;

    const x = fromPts.bottomCenter.x;
    const y1 = fromPts.bottomCenter.y;
    const y2 = toPts.topCenter.y;

    if (y2 > y1) {
      const spineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      spineEl.setAttribute('x1', x);
      spineEl.setAttribute('y1', y1);
      spineEl.setAttribute('x2', x);
      spineEl.setAttribute('y2', y2);
      spineEl.setAttribute('stroke', 'rgba(16,185,129,0.2)');
      spineEl.setAttribute('stroke-width', '2');
      spineEl.setAttribute('stroke-dasharray', '4 4');
      svgLayer.appendChild(spineEl);
    }
  }

  // Draw child connector lines
  sectionNums.forEach(sNum => {
    if (!aiRmExpanded[sNum]) return;

    const sectionNodes = sections[sNum];
    const mainNode = sectionNodes.find(n => n.isMain);
    const children = sectionNodes.filter(n => !n.isMain);

    if (!mainNode || children.length === 0) return;

    const trunkEl = document.getElementById(`ai-rm-node-${mainNode.id}`);
    const trunkPts = getNodePoints(trunkEl);
    if (!trunkPts) return;

    const lineColor = '#1a2a1a';

    children.forEach((child, i) => {
      const childEl = document.getElementById(`ai-rm-node-${child.id}`);
      if (!childEl) return;

      const childPts = getNodePoints(childEl);
      if (!childPts) return;

      const isLeft = (i % 2 === 0);
      const childBorderStyle = AI_RM_BORDER_STYLES[child.border] || AI_RM_BORDER_STYLES.dashed;
      const connColor = childBorderStyle.color === '#10b981'
        ? 'rgba(16,185,129,0.3)'
        : lineColor;

      const fromX = isLeft ? trunkPts.midLeft.x : trunkPts.midRight.x;
      const fromY = trunkPts.centerY;
      const toX = isLeft ? childPts.midRight.x : childPts.midLeft.x;
      const toY = childPts.centerY;

      const midX = (fromX + toX) / 2;

      if (Math.abs(fromY - toY) > 5) {
        const d = `M ${fromX} ${fromY} H ${midX} V ${toY} H ${toX}`;
        const isDashed = child.border === 'dashed';
        svgLayer.appendChild(makePath(d, connColor, isDashed ? '5 3' : ''));
      } else {
        const d = `M ${fromX} ${fromY} H ${toX}`;
        svgLayer.appendChild(makePath(d, connColor, child.border === 'dashed' ? '5 3' : ''));
      }
    });
  });
}

// ── APPLY PROGRESS VISUALS ─────────────────────────────────────
function aiRmApplyProgress() {
  const allNodes = AI_RM_NODES;
  let doneCount = 0;
  const totalCount = allNodes.length;

  allNodes.forEach(node => {
    const el = document.getElementById(`ai-rm-node-${node.id}`);
    const badge = document.getElementById(`ai-rm-badge-${node.id}`);
    if (!el) return;

    el.classList.remove('ai-rm-done', 'ai-rm-inprogress', 'ai-rm-skip');
    if (badge) badge.innerHTML = '';

    const prog = aiRmProgress[node.id];
    if (!prog) return;

    if (prog.status === 'done') {
      doneCount++;
      el.classList.add('ai-rm-done');
      if (badge) badge.innerHTML = `<span class="ai-rm-done-badge">✓</span>`;
    } else if (prog.status === 'progress') {
      el.classList.add('ai-rm-inprogress');
      if (badge) badge.innerHTML = `<span class="ai-rm-progress-ring"></span>`;
    } else if (prog.status === 'skip') {
      el.classList.add('ai-rm-skip');
      if (badge) badge.innerHTML = `<span class="ai-rm-skip-badge">→</span>`;
    }
  });

  const progText = document.getElementById('ai-rm-prog-text');
  if (progText) progText.textContent = `${doneCount} / ${totalCount} done`;

  const bar = document.getElementById('ai-rm-progress-bar');
  if (bar) {
    const pct = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;
    bar.style.width = `${pct}%`;
  }
}

// ── Inject extra dynamic styles ────────────────────────────────
(function aiRmInjectExtraStyles() {
  const styleId = 'ai-rm-dynamic-styles';
  if (document.getElementById(styleId)) return;
  const s = document.createElement('style');
  s.id = styleId;
  s.textContent = `
    .ai-rm-node-status-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 3;
      pointer-events: none;
    }
    .ai-rm-done-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(16,185,129,0.2);
      border: 1px solid rgba(16,185,129,0.5);
      border-radius: 50%;
      color: #6ee7b7;
      font-size: 9px;
      font-weight: 800;
    }
    .ai-rm-skip-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: rgba(128,128,168,0.12);
      border: 1px solid rgba(128,128,168,0.3);
      border-radius: 50%;
      color: #8080a8;
      font-size: 9px;
      font-weight: 800;
    }
    .ai-rm-progress-ring {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(16,185,129,0.2);
      border-top-color: #10b981;
      border-radius: 50%;
      animation: ai-rm-spin 1.2s linear infinite;
    }
    @keyframes ai-rm-spin {
      to { transform: rotate(360deg); }
    }
    .ai-rm-node.ai-rm-done {
      border-color: rgba(16,185,129,0.6) !important;
      background: rgba(16,185,129,0.05) !important;
    }
    .ai-rm-node.ai-rm-inprogress {
      box-shadow: 0 0 0 2px rgba(16,185,129,0.25), 0 0 12px rgba(16,185,129,0.12) !important;
    }
    .ai-rm-node.ai-rm-skip {
      opacity: 0.45;
      filter: saturate(0.3);
    }
    .ai-rm-children-wrap {
      display: flex;
      flex-direction: row;
      gap: 10px;
      width: 100%;
      margin-top: 10px;
      justify-content: center;
      position: relative;
      z-index: 2;
    }
    .ai-rm-child-col {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
      max-width: calc(50% - 5px);
    }
    .ai-rm-child-left  { align-items: flex-end; }
    .ai-rm-child-right { align-items: flex-start; }
    .ai-rm-expand-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(16,185,129,0.5);
      margin: 4px auto 0;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .ai-rm-expand-dot.ai-rm-collapsed {
      transform: rotate(180deg);
      opacity: 0.35;
    }
    .ai-rm-node {
      position: relative;
      border-radius: 10px;
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s, opacity 0.2s, background 0.2s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .ai-rm-node:active { transform: scale(0.97); }
    .ai-rm-trunk {
      padding: 10px 18px 12px;
      min-width: 160px;
      max-width: 260px;
      width: auto;
      text-align: center;
    }
    .ai-rm-child {
      padding: 7px 12px;
      min-width: 100px;
      max-width: 160px;
      width: 100%;
      text-align: center;
      border-radius: 8px;
    }
    .ai-rm-node-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.01em;
      line-height: 1.3;
      display: block;
    }
    .ai-rm-trunk .ai-rm-node-label {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    .ai-rm-node-time {
      font-size: 9px;
      color: #4a5a4a;
      font-family: var(--font-mono, monospace);
      letter-spacing: 0.04em;
    }
    .ai-rm-node-congrats {
      min-width: 200px;
      max-width: 300px;
      padding: 16px 24px 18px;
      border-color: rgba(16,185,129,0.6) !important;
      background: linear-gradient(135deg, #051a10, #0a1f14) !important;
      box-shadow: 0 0 30px rgba(16,185,129,0.12), 0 0 60px rgba(16,185,129,0.06) !important;
    }
    .ai-rm-node-congrats .ai-rm-node-label {
      font-size: 15px;
      color: #10b981 !important;
    }
    .ai-rm-section-label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0 8px;
      margin: 4px 0 0;
    }
    .ai-rm-section-num {
      font-family: var(--font-mono, monospace);
      font-size: 9px;
      color: #10b981;
      font-weight: 700;
      letter-spacing: 0.08em;
      flex-shrink: 0;
    }
    .ai-rm-section-title-text {
      font-size: 9px;
      font-weight: 800;
      color: #4a6a4a;
      letter-spacing: 0.12em;
      flex-shrink: 0;
    }
    .ai-rm-section-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(16,185,129,0.15), transparent);
    }
    .ai-rm-section-mini-prog {
      font-family: var(--font-mono, monospace);
      font-size: 9px;
      color: #3a5a3a;
      flex-shrink: 0;
    }
    .ai-rm-section-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .ai-rm-connector-wrap {
      display: flex;
      justify-content: center;
    }
    .ai-rm-v-line {
      width: 2px;
      background: linear-gradient(to bottom, rgba(16,185,129,0.2), rgba(16,185,129,0.05));
    }
    .ai-rm-svg-layer {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 0;
      overflow: visible;
    }
    @keyframes ai-rm-fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .ai-rm-active-status {
      border-color: #10b981 !important;
      color: #10b981 !important;
    }
  `;
  document.head.appendChild(s);
})();


// ─────────────────────────────────────────────────────────────
// § 5 — BOTTOM SHEET LOGIC
// ─────────────────────────────────────────────────────────────

// Track the currently open node
window._aiRmActiveNode = null;

function aiRmOpenSheet(nodeId) {
  const node = AI_RM_NODES.find(n => n.id === nodeId);
  if (!node) return;

  window._aiRmActiveNode = nodeId;

  const overlay = document.getElementById('ai-rm-overlay');
  const sheet   = document.getElementById('ai-rm-sheet');
  if (!overlay || !sheet) return;

  // ── Populate fields ──────────────────────────────────────────

  // Difficulty badge
  const diffBadge = document.getElementById('ai-rm-sheet-difficulty');
  if (diffBadge) {
    const diffColors = {
      BEGINNER:     { bg: 'rgba(16,185,129,0.15)',  color: '#10b981',  border: 'rgba(16,185,129,0.3)' },
      INTERMEDIATE: { bg: 'rgba(59,130,246,0.15)',  color: '#3b82f6',  border: 'rgba(59,130,246,0.3)' },
      ADVANCED:     { bg: 'rgba(168,85,247,0.15)',  color: '#a855f7',  border: 'rgba(168,85,247,0.3)' },
      OPTIONAL:     { bg: 'rgba(128,128,168,0.15)', color: '#8080a8',  border: 'rgba(128,128,168,0.3)' }
    };
    const dc = diffColors[node.difficulty] || diffColors.BEGINNER;
    diffBadge.textContent = node.difficulty;
    diffBadge.style.cssText = `
      background: ${dc.bg};
      color: ${dc.color};
      border: 1px solid ${dc.border};
      padding: 2px 8px;
      border-radius: 20px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.06em;
      display: inline-block;
    `;
  }

  // Title
  const titleEl = document.getElementById('ai-rm-sheet-title');
  if (titleEl) titleEl.textContent = node.label;

  // Time badge
  const timeEl = document.getElementById('ai-rm-sheet-time');
  if (timeEl) timeEl.textContent = `⏱ ${node.time}`;

  // Why this matters
  const whyEl = document.getElementById('ai-rm-sheet-why');
  if (whyEl) whyEl.textContent = node.whyMatters;

  // Learn bullets
  const learnEl = document.getElementById('ai-rm-sheet-learn');
  if (learnEl) {
    learnEl.innerHTML = (node.learn || [])
      .map(item => `<li style="margin-bottom:5px; line-height:1.5;">${item}</li>`)
      .join('');
  }

  // Prerequisites
  const prereqEl = document.getElementById('ai-rm-sheet-prereq');
  if (prereqEl) prereqEl.textContent = node.prerequisites || 'None';

  // Practice task
  const taskEl = document.getElementById('ai-rm-sheet-task');
  if (taskEl) taskEl.textContent = node.task;

  // YouTube button
  const ytBtn = document.getElementById('ai-rm-sheet-youtube');
  if (ytBtn && node.youtubeQuery) {
    const ytUrl = `https://youtube.com/results?search_query=${encodeURIComponent(node.youtubeQuery)}`;
    ytBtn.onclick = () => window.open(ytUrl, '_blank');
  }

  // Docs button
  const docsBtn = document.getElementById('ai-rm-sheet-docs');
  if (docsBtn && node.docsUrl) {
    docsBtn.onclick = () => window.open(node.docsUrl, '_blank');
  }

  // Refresh status button highlights
  aiRmRefreshStatusButtons(nodeId);

  // Show sheet
  overlay.classList.add('ai-rm-overlay-show');
  sheet.classList.add('ai-rm-sheet-open');
  document.body.style.overflow = 'hidden';

  // Scroll sheet back to top
  sheet.scrollTop = 0;
}

function aiRmCloseSheet() {
  const overlay = document.getElementById('ai-rm-overlay');
  const sheet   = document.getElementById('ai-rm-sheet');
  if (overlay) overlay.classList.remove('ai-rm-overlay-show');
  if (sheet)   sheet.classList.remove('ai-rm-sheet-open');
  document.body.style.overflow = '';
  window._aiRmActiveNode = null;
}

function aiRmSetStatus(nodeId, status) {
  if (!nodeId) return;

  const currentStatus = aiRmProgress[nodeId] ? aiRmProgress[nodeId].status : null;
  const wasAlreadyThisStatus = currentStatus === status;

  if (wasAlreadyThisStatus) {
    // Toggle off
    delete aiRmProgress[nodeId];
  } else {
    aiRmProgress[nodeId] = {
      status: status,
      doneAt: new Date().toISOString()
    };
  }

  aiRmSaveProgress();
  aiRmApplyProgress();
  aiRmRefreshStatusButtons(nodeId);

  if (!wasAlreadyThisStatus && status === 'done') {
    aiRmShowToast('✓ Marked complete!');
  } else if (wasAlreadyThisStatus && status === 'done') {
    aiRmShowToast('↩ Unmarked');
  }
}

// ── Refresh status button highlights ──────────────────────────
function aiRmRefreshStatusButtons(nodeId) {
  const prog = aiRmProgress[nodeId];
  const currentStatus = prog ? prog.status : null;

  const btnDone     = document.getElementById('ai-rm-btn-done');
  const btnProgress = document.getElementById('ai-rm-btn-progress');
  const btnSkip     = document.getElementById('ai-rm-btn-skip');

  [btnDone, btnProgress, btnSkip].forEach(btn => {
    if (btn) btn.classList.remove('ai-rm-active-status');
  });

  if (currentStatus === 'done'     && btnDone)     btnDone.classList.add('ai-rm-active-status');
  if (currentStatus === 'progress' && btnProgress) btnProgress.classList.add('ai-rm-active-status');
  if (currentStatus === 'skip'     && btnSkip)     btnSkip.classList.add('ai-rm-active-status');
}

// ── Toast notification ─────────────────────────────────────────
function aiRmShowToast(msg) {
  if (typeof APP !== 'undefined' && typeof APP.toast === 'function') {
    APP.toast(msg);
    return;
  }

  const toast = document.getElementById('ai-rm-toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('ai-rm-toast-show');

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove('ai-rm-toast-show');
  }, 1800);
}

// ── Swipe-to-dismiss ──────────────────────────────────────────
(function aiRmInitSwipe() {
  const sheet = document.getElementById('ai-rm-sheet');
  if (!sheet) return;

  let startY       = 0;
  let currentY     = 0;
  let isDragging   = false;
  let startScrollTop = 0;

  sheet.addEventListener('touchstart', (e) => {
    startScrollTop = sheet.scrollTop;
    startY   = e.touches[0].clientY;
    currentY = startY;
    isDragging = true;
  }, { passive: true });

  sheet.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 0 && startScrollTop <= 0) {
      const resistance = Math.min(deltaY * 0.6, 200);
      sheet.style.transform = `translateY(${resistance}px)`;
      sheet.style.transition = 'none';
    }
  }, { passive: true });

  sheet.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    const deltaY = currentY - startY;
    sheet.style.transition = '';
    if (deltaY > 80 && startScrollTop <= 0) {
      sheet.style.transform = '';
      aiRmCloseSheet();
    } else {
      sheet.style.transform = '';
    }
  }, { passive: true });

  sheet.addEventListener('touchcancel', () => {
    isDragging = false;
    sheet.style.transform = '';
    sheet.style.transition = '';
  }, { passive: true });
})();

// ── Overlay click ─────────────────────────────────────────────
(function aiRmInitOverlayClick() {
  const overlay = document.getElementById('ai-rm-overlay');
  if (!overlay) return;
  overlay.addEventListener('click', aiRmCloseSheet);
})();

// ── Escape key ────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const sheet = document.getElementById('ai-rm-sheet');
    if (sheet && sheet.classList.contains('ai-rm-sheet-open')) {
      aiRmCloseSheet();
    }
  }
});


// ─────────────────────────────────────────────────────────────
// § 6 — INIT FUNCTION
// ─────────────────────────────────────────────────────────────

function aiRmInit() {
  aiRmRender();
  aiRmDrawLines();
  aiRmApplyProgress();

  window.addEventListener('resize', () => {
    clearTimeout(window._aiRmResizeTimer);
    window._aiRmResizeTimer = setTimeout(aiRmDrawLines, 150);
  });

  const graph = document.getElementById('ai-rm-graph');
  if (graph) {
    graph.addEventListener('scroll', () => {
      clearTimeout(window._aiRmScrollTimer);
      window._aiRmScrollTimer = setTimeout(aiRmDrawLines, 80);
    }, { passive: true });
  }
}

// ─────────────────────────────────────────────────────────────
// § 7 — GLOBAL EXPOSURES
// ─────────────────────────────────────────────────────────────

window.aiRmCloseSheet = aiRmCloseSheet;
window.aiRmOpenSheet  = aiRmOpenSheet;
window.aiRmSetStatus  = aiRmSetStatus;

if (typeof window._aiRmActiveNode === 'undefined') {
  window._aiRmActiveNode = null;
}

// ─────────────────────────────────────────────────────────────
// § 8 — BOOT  (DOMContentLoaded guard)
// ─────────────────────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', aiRmInit);
} else {
  aiRmInit();
}

})(); // end IIFE
