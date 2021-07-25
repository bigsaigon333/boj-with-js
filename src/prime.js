function isPrime1(n) {
  if (n === 1) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function isPrime2(n) {
  if (n === 1) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function allPrime1(n) {
  const primes = [];
  for (let i = 2; i * i <= n; i++) {
    if (isPrime2(i)) primes.push(i);
  }

  return primes;
}

function allPrime2(n) {
  const sieve = Array(n + 1).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (!sieve[i]) continue;

    for (let j = i; j * i <= n; j++) {
      sieve[i * j] = false;
    }
  }

  return sieve.filter((isPrime) => isPrime).map((isPrime, num) => num);
}
