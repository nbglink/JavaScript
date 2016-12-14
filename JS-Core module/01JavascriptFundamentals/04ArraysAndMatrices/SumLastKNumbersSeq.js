function sumLastKNumbersSequence([n, k]) {
    let seq = [1];
    for (let current = 1; current < n; current++) {
        let start = Math.max(0, current - k);
        let end = current - 1;

        let sum = 0;

        for (let prev = start; prev <= end; prev++)
        {
            sum += seq[prev];
        }
        seq[current] = sum;


    }
    console.log(seq.join(' '));


}

sumLastKNumbersSequence(['6', '3']);