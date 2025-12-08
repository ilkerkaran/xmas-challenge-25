import os
import time
start_time = time.time()


def read(filename="../../inputs/day-6/input.txt"):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, filename)
    with open(file_path, "r") as f:
        return f.read()


class MathProblem:
    def __init__(self, lines):
        self.numbers_per_line = []

        for line in lines:
            numbers = [num for num in line.strip().split(
            ) if num.strip() != '']
            self.numbers_per_line.append(numbers)


def calculate(numbers, sign):
    print(f"calculatiing numbers: {numbers} with sign: {sign}")
    if sign == '+':
        return sum(numbers)
    elif sign == '*':
        result = 1
        for num in numbers:
            result *= num
        return result
    return 0


lines = read().splitlines()
mathProblem = MathProblem(lines)
lineCount = len(lines)
ans1 = 0
ans2 = 0
length = len(mathProblem.numbers_per_line[0])
ctr = 0
while ctr < length:
    nums = []
    y_ctr = 0
    while y_ctr < lineCount:
        nums.append(mathProblem.numbers_per_line[y_ctr][ctr])
        y_ctr += 1
    ans1 += calculate([int(n) for n in nums[0:len(nums) - 1]],
                      nums[len(nums) - 1])
    ctr += 1


print(f"Ans1: {ans1}")
print(f"Ans2: {ans2}")
print(f"Execution time: {(time.time() - start_time) * 1000:.4f} ms")
