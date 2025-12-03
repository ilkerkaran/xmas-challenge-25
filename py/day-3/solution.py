import os
import time
start_time = time.time()


first_part_offset = 2
second_part_offset = 12


def read(filename="../../inputs/day-3/input.txt"):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, filename)
    with open(file_path, "r") as f:
        return f.read()


lines = read().splitlines()


def find_biggest_digit(line, offset):
    biggest = 0

    for digit_to_find in [9, 8, 7, 6, 5, 4, 3, 2, 1]:
        if str(digit_to_find) in line[0:len(line)-offset]:
            biggest = digit_to_find
            break
    return [biggest, line.index(str(biggest))]


def find_biggest_sub_number(line, digits):
    num = ""
    l = line
    while digits > 0:
        biggest, index = find_biggest_digit(l, digits-1)
        num += str(biggest)
        l = l[index+1:]
        digits -= 1
    return int(num)


sum = 0
for line in lines:
    sum += find_biggest_sub_number(line, second_part_offset)
print(f"answer: {sum}")
print(f"Execution time: {round((time.time() - start_time) * 1000, 4)} ms")
