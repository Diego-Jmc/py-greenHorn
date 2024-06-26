import ply.yacc as yacc
from lexer import tokens

def p_program(p):
    """program : stm program
               | stm
    """
    if len(p) == 3:
        p[0] = p[1] + p[2]
    else:
        p[0] = p[1]


def p_stm(p):
    """ stm :  print
        | assignation
        | expression
    """
    p[0] = [p[1]]


def p_print(p):
    """ print : PRINT LEFTPH expression RIGTHPH
            | PRINT LEFTPH value RIGTHPH
     """
    p[0] = ('print', p[3])


def p_expression(p):
    """expression : expression operator expression
                  | value operator value
                  | value
    """
    if len(p) == 4:
        p[0] = (str(p[1]) + str(p[2]) + str(p[3]))
    elif len(p) == 3:
        p[0] = (str(p[2]) + str(p[3]))
    else:
        p[0] = (p[1])


def p_operator(p):
    """ operator : PLUS
                 | MINUS
                 | TIMES
                 | DIVIDE
    """
    p[0] = p[1]


def p_assignation(p):
    """
        assignation : DEFINITION ID ASSIGN value
                    | DEFINITION ID ASSIGN expression
                    | DEFINITION ID ASSIGN generator
    """

    p[0] = ('assignation', p[2], p[4])


def p_value(p):
    """value : NUMBER
            | STRING
            | ID

    """
    p[0] = p[1]


def p_generator(p):
    """generator : GENERATOR LEFTPH NUMBER COMMA NUMBER COMMA expression RIGTHPH FOR ID"""
    p[0] = ('generator', p[3], p[5], p[7], p[10])


def p_error(p):
    print("Syntax error at column", p.lineno, "pos:", p.lexpos)

parser = yacc.yacc()

def parse_expression(input_string):
    result = parser.parse(input_string)
    return result



